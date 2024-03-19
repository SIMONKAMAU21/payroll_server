import { poolRequest } from "../utils/dbConnect.js";
import sql from 'mssql';


export const addOvertimeServices = async (newOvertime) => {
    try {
        const result = await poolRequest()
            .input('Date', sql.DateTime, newOvertime.Date)
            .input('Hours', sql.Int, newOvertime.Hours)
            .input('Minutes', sql.Int, newOvertime.Minutes)
            .input('Rate', sql.Decimal, newOvertime.Rate)
            .query(`INSERT INTO Overtime(Date,Hours,Minutes,Rate) VALUES(@Date,@Hours,@Minutes,@Rate)`
            )
        return result
    } catch (error) {
        return error.message
    }
}

export const getAllOvertimeServices = async () => {
    try {
        const result = await poolRequest().query('SELECT * FROM Overtime');
        return result.recordset;
    } catch (error) {
        throw new Error('Could not fetch all Overtimes: ' + error.message);
    }
};

export const deleteOvertimeServices = async (ID) => {
    try {
        const Overtime = await poolRequest()
            .input('ID', sql.Int, ID)
            .query(`DELETE FROM Overtime WHERE ID = @ID`);

        return Overtime.rowsAffected[0] > 0;
    } catch (error) {
        throw new Error("Failed to delete Overtime: " + error.message);
    }
};

export const updateOvertimeServices = async (ID, updatedOvertimeData) => {
    try {
        const Overtime = await poolRequest()
            .input('ID', sql.Int, ID)
            .input('Date', sql.DateTime, updatedOvertimeData.Date)
            .input('Hours', sql.Int, updatedOvertimeData.Hours)
            .input('Minutes', sql.Int, updatedOvertimeData.Minutes)
            .input('Rate', sql.Decimal, updatedOvertimeData.Rate)
            .query(` UPDATE Overtime SET 
      
            Date=@Date,
            Hours=@Hours,
            Minutes=@Minutes,
            Rate=@Rate
      WHERE ID = @ID`
            )
        return Overtime.rowsAffected[0] > 0;
    } catch (error) {
        throw new Error("Failed to update Overtime: " + error.message);
    }
};


export const getOvertimeByIdService = async (ID) => {
    try {
        const query = `
            SELECT *
            FROM Overtime
            WHERE ID = @ID
        `;
        const result = await poolRequest()
            .input('ID', sql.Int, ID)
            .query(query);
        return result.recordset;
    } catch (error) {
        throw new Error('Could not fetch Overtime by ID: ' + error.message);
    }
};
