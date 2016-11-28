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

            statement = "CREATE TABLE WIDGETS (" +
                "ID INTEGER PRIMARY KEY AUTOINCREMENT," +
                "UID INTEGER," + 
                "STOCKLIST CHAR(1024)," +
                "TYPE INTEGER," +
                "REFRESH INTEGER," +
                "X INTEGER, " +
                "Y INTEGER, " +
                "HEIGHT INTEGER, " +
                "WIDTH INTEGER," +
                "FOREIGN KEY(UID) REFERENCES USERS(ID)" + 
                ");";

            command = new SQLiteCommand(statement, connection);

            command.ExecuteNonQuery();

            statement = "CREATE TABLE MAIL (" +
                "ID INTEGER PRIMARY KEY AUTOINCREMENT," +
                "UID INTEGER," +
                "STOCK CHAR(64)," +
                "FOREIGN KEY(UID) REFERENCES USERS(ID)" +
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
            long id = (long)command.ExecuteScalar();

            //insert the password
            statement = "INSERT INTO PASSWORDS(ID, PASSWORD) VALUES(@id,@pass)";
            command = new SQLiteCommand(statement, connection);

            command.Parameters.AddWithValue("id", id);
            command.Parameters.AddWithValue("pass", password);
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
        //will convert an array of stocks into a database storable string
        public static string stockArrayToString(string[] stocks) {
            string converted = "";
            for (int i = 0; i < stocks.Length; i++) {
                converted += stocks[i];
                if (i != stocks.Length - 1) {
                    converted += ",";
                }
            }

            return converted;
        }
        //will convert a string of stocks into a useable array
        public static string[] stockStringToArray(string stocks) {
            return stocks.Split(',');
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
            //grab the users widgets
            if (user != null) {
                WidgetModel[] widgets = getAllWidgets(id);
                user.widgetList = widgets;
            }
            
            
            return user;
        }

        //inserts a widget into the database
        public static long createWidget(long uid, WidgetModel widget) {
            SQLiteConnection connection = connect();

            string statement = "INSERT INTO WIDGETS(UID, STOCKLIST, TYPE, REFRESH, X, Y, HEIGHT, WIDTH) VALUES(" + 
                uid + ", '" + stockArrayToString(widget.stockList) + "', " + widget.widgetType + ", " + widget.refresh + "," + widget.x + "," + widget.y + "," + widget.height + "," + widget.width + ")";
            SQLiteCommand command = new SQLiteCommand(statement, connection);

            command.ExecuteNonQuery();
            //grab the id
            statement = "SELECT last_insert_rowid()";
            command = new SQLiteCommand(statement, connection);
            Int64 id = (Int64)command.ExecuteScalar();

            disconnect(connection);
            return id;
        }

        //inserts an email entry

        public static long createMail(long uid, string stock) {
            SQLiteConnection connection = connect();
            string statement = "INSERT INTO MAIL(UID, STOCK) VALUES(" +
                uid + ", '" + stock + "')";
            SQLiteCommand command = new SQLiteCommand(statement, connection);
            command.ExecuteNonQuery();

            statement = "SELECT last_insert_rowid()";
            command = new SQLiteCommand(statement, connection);
            Int64 id = (Int64)command.ExecuteScalar();

            disconnect(connection);
            return id;
        }

        public static bool removeMail(long uid, string stock) {
            SQLiteConnection connection = connect();
            bool status = true;
            string statement = "DELETE FROM MAIL WHERE UID = " + uid + " AND STOCK='" + stock + "'";
            SQLiteCommand command = new SQLiteCommand(statement, connection);
            command.ExecuteNonQuery();
            disconnect(connection);
            return status;
        }

        
        public static string[] getAllMail(long uid) {
            LinkedList<string> stocks = new LinkedList<string>();
            SQLiteConnection connection = connect();

            string statement = "SELECT * FROM MAIL WHERE UID = " + uid;
            SQLiteCommand command = new SQLiteCommand(statement, connection);
            SQLiteDataReader reader = command.ExecuteReader();

            if (reader.HasRows) {
                while (reader.Read()) {
                    string stock = (string)reader[2];
                    stocks.AddLast(stock);
                }
            }

            reader.Close();
            disconnect(connection);

            return stocks.ToArray();
        }
        

        //updates a widget in the database
        public static void updateWidget(long wid, WidgetModel newWidget) {
            SQLiteConnection connection = connect();
            string statement = "UPDATE WIDGETS SET " +
                "STOCKLIST = '" + stockArrayToString(newWidget.stockList) + "', TYPE = " + newWidget.widgetType + ", REFRESH = " + newWidget.refresh + ", X = " + newWidget.x + ", Y = " + newWidget.y + ", HEIGHT = " + newWidget.height + ", WIDTH = " + newWidget.width + " " +
                "WHERE ID = " + wid;

            SQLiteCommand command = new SQLiteCommand(statement, connection);

            command.ExecuteNonQuery();

            disconnect(connection);
        }

        //deletes a widget in the database
        public static void deleteWidget(long wid) {
            SQLiteConnection connection = connect();

            string statement = "DELETE FROM WIDGETS WHERE ID = " + wid;

            SQLiteCommand command = new SQLiteCommand(statement, connection);

            command.ExecuteNonQuery();

            disconnect(connection);
        }

        //grabs a widget from the database
        public static WidgetModel getWidget(long wid) {
            WidgetModel widget;
            SQLiteConnection connection = connect();

            string statement = "SELECT * FROM WIDGETS WHERE ID = " + wid;
            SQLiteCommand command = new SQLiteCommand(statement, connection);
            SQLiteDataReader reader = command.ExecuteReader();

            if (reader.HasRows) {
                reader.Read();
                long id = (long)reader[0];
                string stocklist = (string)reader[2];
                long type = (long)reader[3];
                long refresh = (long)reader[4];
                long x = (long)reader[5];
                long y = (long)reader[6];
                long height = (long)reader[7];
                long width = (long)reader[8];
                widget = new WidgetModel();
                widget.id = id;
                widget.stockList = stockStringToArray(stocklist);
                widget.widgetType = type;
                widget.refresh = refresh;
                widget.x = x;
                widget.y = y;
                widget.height = height;
                widget.width = width;
                
            }
            else {
                widget = null;
            }

            reader.Close();
            disconnect(connection);

            return widget;
        }

        //grabs all widget from the database
        public static WidgetModel[] getAllWidgets(long uid) {
            LinkedList<WidgetModel> widgets = new LinkedList<WidgetModel>();
            SQLiteConnection connection = connect();

            string statement = "SELECT * FROM WIDGETS WHERE UID = " + uid;
            SQLiteCommand command = new SQLiteCommand(statement, connection);
            SQLiteDataReader reader = command.ExecuteReader();

            if (reader.HasRows) {
                while (reader.Read()) {
                    long id = (long)reader[0];
                    string stocklist = (string)reader[2];
                    long type = (long)reader[3];
                    long refresh = (long)reader[4];
                    long x = (long)reader[5];
                    long y = (long)reader[6];
                    long height = (long)reader[7];
                    long width = (long)reader[8];
                    WidgetModel widget = new WidgetModel();
                    widget.id = id;
                    widget.stockList = stockStringToArray(stocklist);
                    widget.widgetType = type;
                    widget.refresh = refresh;
                    widget.x = x;
                    widget.y = y;
                    widget.height = height;
                    widget.width = width;

                    widgets.AddLast(widget);
                }
            }

            reader.Close();
            disconnect(connection);

            return widgets.ToArray();
        }
    }
}
