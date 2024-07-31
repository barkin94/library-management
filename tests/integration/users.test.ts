import { Client } from 'pg';
import { PostgreSqlContainer, StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import request from 'supertest';
import { overrideConfig } from '../../src/config';
import { Express } from 'express'
import { borrowBook, createUser, getUserById, getUsers, returnBook } from '../../src/api/controllers/users';
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

    beforeEach(async () => {
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

    describe(borrowBook.name, () => {
        // TOOD: test invalid request params

        
        it('should return 404 if user is not found', async () => {
            await postgresClient.query('INSERT INTO public.book (id, name) VALUES (1, \'Dune\');');

            const response = await request(app).post('/users/1/borrow/1')
            
            expect(response.status).toEqual(404);
            expect(response.body.message).toEqual('user not found')

        })

        it('should return 404 if book is not found', async () => {
            await postgresClient.query('INSERT INTO public.user (id, name) VALUES (1, \'John Doe\');');

            const response = await request(app).post('/users/1/borrow/1')
            
            expect(response.status).toEqual(404);
            expect(response.body.message).toEqual('book not found')
        })

        // it('should return 403 if book is not available', async () => {
        //     await postgresClient.query('INSERT INTO public.user (id, name) VALUES (1, \'John Doe\');');
        //     await postgresClient.query('INSERT INTO public.book (id, name) VALUES (1, \'Dune\');');
        //     await postgresClient.query('INSERT INTO public.book_borrow (id, user_id, book_id) VALUES (1, 1, 1);')

        //     const response = await request(app).post('/users/1/borrow/1')
            
        //     expect(response.status).toEqual(403);
        //     expect(response.body.message).toEqual('book is unavailable')
        // })
    })

    describe(returnBook.name, () => {

        //TODO: test invalid request body

        it('should return 403 for already returned books', async () => {
            await postgresClient.query('INSERT INTO public.user (id, name) VALUES (1, \'John Doe\');');
            await postgresClient.query('INSERT INTO public.book (id, name) VALUES (1, \'Dune\');');
            await postgresClient.query('INSERT INTO public.book_borrow (id, user_id, book_id, returned_at, rating) VALUES (1, 1, 1, CURRENT_TIMESTAMP, 8);')

            const response = await request(app)
                .post('/users/1/return/1')
                .send({
                    score: 9
                })
            
            expect(response.status).toEqual(403);
            expect(response.body.message).toEqual('already returned');

        })


        it('should return a book', async () => {
            await postgresClient.query('INSERT INTO public.user (id, name) VALUES (1, \'John Doe\');');
            await postgresClient.query('INSERT INTO public.book (id, name) VALUES (1, \'Dune\');');
            await postgresClient.query('INSERT INTO public.book_borrow (id, user_id, book_id) VALUES (1, 1, 1);')


            const response = await request(app)
                .post('/users/1/return/1')
                .send({
                    score: 9
                })

            const borrow = (await postgresClient.query('SELECT * FROM public.book_borrow WHERE id = 1')).rows[0];
            
            expect(response.status).toEqual(204);
            expect(borrow.rating).toEqual(9);
            expect(borrow.returned_at).toBeDefined();
        })
    })
});
