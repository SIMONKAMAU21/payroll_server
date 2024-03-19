import { poolRequest } from "../utils/dbConnect.js";
import sql from 'mssql';


export const addAdvanceServices = async (newAdvance) => {
    try {
        const result = await poolRequest()
            .input('Date', sql.Date, newAdvance.Date)
            .input('Amount', sql.Decimal, newAdvance.Amount)
            .query(`INSERT INTO AdvanceCash (Date,Amount) VALUES(@Date,@Amount)`
            )
        return result
    } catch (error) {
        return error.message
    }
}
