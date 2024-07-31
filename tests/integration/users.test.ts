import { Client } from 'pg';
import { PostgreSqlContainer, StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import request from 'supertest';
import { overrideConfig } from '../../src/config';
import { Express } from 'express'
import { borrowBook, createUser, getUserById, getUsers } from '../../src/api/controllers/users';
import { getExpressApp } from '../../src/api';

describe("Users controller integration tests", () => {
    jest.setTimeout(60000)
    let postgresContainer: StartedPostgreSqlContainer;
    let postgresClient: Client;
    let app: Express;

    beforeAll(async () => {
        postgresContainer = await new PostgreSqlContainer().start();
        const connectionString = postgresContainer.getConnectionUri();
        postgresClient = new Client({ connectionString });
        await postgresClient.connect();

        overrideConfig({
            db: {
                connectionString,
                logging: false
            }
        })

        const startAppPromise = (await import('../../src/main')).default;
        await startAppPromise;
        app = getExpressApp()

        // give typeorm to create tables in test containers
        await new Promise((res) => setTimeout(res, 3000))
    });

    afterEach(async () => {
        await postgresClient.query('DELETE FROM public.book_borrow WHERE true;');
        await postgresClient.query('DELETE FROM public.user WHERE true;');
        await postgresClient.query('DELETE FROM public.book WHERE true;');
    })

    afterAll(async () => {
        await postgresClient.end();
        await postgresContainer.stop();
    });

    describe(getUsers.name, () => {
        it('should list users', async () => {
            await postgresClient.query('INSERT INTO public.user (name) VALUES (\'John Doe\');');
            const response = await request(app).get('/users');
            expect(response.status).toEqual(200);
            expect(response.body).toMatchObject([
                { id: 1, name: 'John Doe' }
            ])
        })
    })

    describe(createUser.name, () => {
        it('should fail when invalid body is sent', async () => {
            const response = await request(app)
                .post('/users')
                .send({})
            
            expect(response.status).toEqual(400);
            expect(response.text).toEqual('Error validating request body. "name" is required.')
        })


        it('should succeed with valid a body', async () => {
            const response = await request(app)
                .post('/users')
                .send({ name: 'John Doe' })
            
            expect(response.status).toEqual(201);
        })
    })

    describe(getUserById.name, () => {
        it('should return user with book borrowing history', async () => {
            await postgresClient.query('INSERT INTO public.user (id, name) VALUES (1, \'John Doe\');');
            await postgresClient.query('INSERT INTO public.book (id, name) VALUES (1, \'Dune\'),(2, \'Harry Potter\');');
            await postgresClient.query('INSERT INTO public.book_borrow (id, user_id, book_id) VALUES (1, 1, 1);')
            await postgresClient.query('INSERT INTO public.book_borrow (id, user_id, book_id, returned_at, rating) VALUES (2, 1, 2, CURRENT_TIMESTAMP, 8);')

            const response = await request(app).get('/users/1')
            
            expect(response.status).toEqual(200);
            expect(response.body).toMatchObject({
                id: 1,
                name: 'John Doe',
                books: {
                    past: [{ name: 'Harry Potter', userScore: 8 }],
                    present: [{ name: 'Dune' }]
                }
            })
        })
    })
});
