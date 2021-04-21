export class Patient {
    patientId: number | undefined;
    name: string | undefined;
    OrderId: {
        orderId: number | undefined;
        message: string;
    } | undefined;
    constructor() {}
}