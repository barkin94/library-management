export class UserNotFound extends Error {
	constructor(
		public readonly userId: number
	) {
		super(`${userId} not found`);
	}
}