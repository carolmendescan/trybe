export default class Email {
  public static emailRegex = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;

  public static isValidEmail(email: string): boolean {
    return this.emailRegex.test(email);
  }
}
