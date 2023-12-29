export class Utils {
    static getCurrencyDate(): Date {
        return new Date();
    }
    static formatDate(date: Date): string {
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const year = date.getFullYear();
        return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
    }
}
