using StorkServer.Sql.Models;
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
        //returns the id of the user
        public static long createUser(string email, string password) {
            SQLiteConnection connection = connect();

            string statement = "INSERT INTO USERS(EMAIL) VALUES('" + email + "')";
            SQLiteCommand command = new SQLiteCommand(statement, connection);

            command.ExecuteNonQuery();
            //grab the id
            statement = "SELECT last_insert_rowid()";
            command = new SQLiteCommand(statement, connection);
            Int64 id = (Int64)command.ExecuteScalar();

            //insert the password
            statement = "INSERT INTO PASSWORDS(ID, PASSWORD) VALUES(" + id + ",'" + password + "')";
            command = new SQLiteCommand(statement, connection);
            command.ExecuteNonQuery();

            disconnect(connection);
            return id;
        }

        //returns the id of a user given an email
        //returns -1 if no user found
        public static long getUserId(string email) {
            SQLiteConnection connection = connect();
            long id;
            string statement = "SELECT ID FROM USERS WHERE EMAIL = '" + email + "'";
            SQLiteCommand command = new SQLiteCommand(statement, connection);

            SQLiteDataReader reader = command.ExecuteReader();
            if (reader.HasRows) {
                reader.Read();
                id = (Int64) reader[0];
            }
            else {
                id = -1;
            }
            reader.Close();
            disconnect(connection);

            return id;
        }

        //obtains the users password, if nothing was found null is returned
        public static string getUserPassword(long id) {
            SQLiteConnection connection = connect();
            string password = null;

            string statement = "SELECT PASSWORD FROM PASSWORDS WHERE ID = " + id;
            SQLiteCommand command = new SQLiteCommand(statement, connection);
            SQLiteDataReader reader = command.ExecuteReader();

            if (reader.HasRows) {
                reader.Read();
                password = (string) reader[0];
            }
            reader.Close();
            disconnect(connection);

            return password;
        }

        //obtains a user from the database given id (will be fleshed out more once widgets are in)
        public static UserModel getUser(long id) {
            UserModel user;
            SQLiteConnection connection = connect();

            string statement = "SELECT * FROM USERS WHERE ID = " + id;
            SQLiteCommand command = new SQLiteCommand(statement, connection);
            SQLiteDataReader reader = command.ExecuteReader();

            if (reader.HasRows) {
                reader.Read();
                long rid = (long) reader[0];
                string email = (string)reader[1];
                user = new UserModel();
                user.id = rid;
                user.email = email;
            }
            else {
                user = null;
            }
            reader.Close();
            disconnect(connection);
            return user;
        }
    }
}
