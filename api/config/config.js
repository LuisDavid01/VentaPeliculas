import dotenv from 'dotenv';
dotenv.config();
export const config = {
	DATABASE_URL:process.env.DATABASE_URL,
	salt: process.env.salt,
	JWT_SECRET: process.env.JWT_SECRET,
	STRIPE_SECRET: process.env.STRIPE_SECRET,
	firebaseConfig: {
		type: process.env.type,
	project_id: process.env.project_id,
	private_key_id: process.env.private_key_id,
	private_key: process.env.private_key,
 	client_email: process.env.client_email,
	client_id: process.env.client_id,
	auth_uri: process.env.auth_uri,
	token_uri: process.env.token_uri,
	auth_provider_x509_cert_url:process.env.auth_provider_x509_cert_url,
	client_x509_cert_url: process.env.client_x509_cert_url,
	universe_domain: process.env.universe_domain,

		
	},
	STORAGE_BUCKET: process.env.STORAGE_BUCKET,
	WEBHOOK_SECRET: process.env.WEBHOOK_SECRET,
	EMAIL_TOKEN: process.env.EMAIL_TOKEN,
	HCAPTCHA_SECRET: process.env.HCAPTCHA_SECRET





}
