import dotenv from 'dotenv';

dotenv.config();

let config = {
	port: parseInt(process.env.PORT ?? '3000'),
	db: {
		connectionString: process.env.POSTGRES_URL ?? '',
		debug: process.env.POSTGRES_DEBUG == 'true' || false
	}
}

export const overrideConfig = (overridenValues: Partial<typeof config>) => {
	config = { ...config, ...overridenValues }
}   

export const getConfig = () => ({ ...config });
