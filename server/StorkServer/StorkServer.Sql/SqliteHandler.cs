using System;
using System.Collections.Generic;
using System.Data.SQLite;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StorkServer.Sql {
    public class SqliteHandler {
        public static string DBNAME = "data.sqlite";

        //Creates the database file and creates the tables if need be
        public static void InitDB() {
            if (!(File.Exists(DBNAME))) {
                Console.WriteLine("Database not found. Creating now...");
                SQLiteConnection.CreateFile(DBNAME);
                createTables();
            }
            else {
                Console.WriteLine("Database file found.");
            }
            
        }
        //grab a connection to the database
        public static SQLiteConnection connect() {
            SQLiteConnection connection  = new SQLiteConnection("Data Source = " + DBNAME + "; Version = 3;");
            connection.Open();
            return connection;
        }
        //disconnect from the database
        public static void disconnect(SQLiteConnection connection) {
            connection.Dispose();
        }
        //intialize the database
        private static void createTables() {
            SQLiteConnection connection = connect();

            string statement = "CREATE TABLE USERS (" +
                "ID INTEGER PRIMARY KEY AUTOINCREMENT," +
                "EMAIL CHAR(50)" +
                ");";

            SQLiteCommand command = new SQLiteCommand(statement, connection);

            command.ExecuteNonQuery();

            statement = "CREATE TABLE PASSWORDS (" +
                "ID INTEGER PRIMARY KEY," +
                "PASSWORD CHAR(100)," + 
                "FOREIGN KEY(ID) REFERENCES USERS(ID)" +
                ");";

            command = new SQLiteCommand(statement, connection);

            command.ExecuteNonQuery();

            disconnect(connection);
        }
    }
}
