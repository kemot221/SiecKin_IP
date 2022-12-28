import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBConnection {
    static final String DB_URL = "jdbc:mariadb://localhost:3306";
    static final String USER = "root";
    static final String PASS = "";

    Connection conn;

    DBConnection() {
        try {
            conn = DriverManager.getConnection(DB_URL + "/sieckin", USER, PASS);
        } catch (SQLException e) {
            System.out.println(e.getMessage());
            return;
        }
        System.out.println("Connected to DB...");
    }

    /*void createDB(){
        try {
            Statement statement = conn.createStatement();
            statement.executeUpdate("CREATE DATABASE tcptest");
            conn = DriverManager.getConnection(DB_URL+"/tcptest", USER, PASS);
            statement = conn.createStatement();
            System.out.println("Creating tables...");
            statement.executeUpdate(
                    "CREATE TABLE pytania(" +
                            "tresc varchar(100) not null," +
                            "pop_odp varchar(1) not null," +
                            "odp1 varchar(30) not null," +
                            "odp2 varchar(30) not null," +
                            "odp3 varchar(30) not null," +
                            "odp4 varchar(30) not null)");
            statement.executeUpdate(
                    "CREATE TABLE odp_wyn(" +
                            "odpowiedzi varchar(100) not null," +
                            "wynik double(3,0) not null)");
            statement.executeUpdate(
                    "INSERT INTO pytania(tresc, pop_odp, odp1, odp2, odp3, odp4) VALUES" +
                            "('Pytanie 1','a','a','b','c','d')," +
                            "('Pytanie 2','b','a','b','c','d')," +
                            "('Pytanie 3','c','a','b','c','d')," +
                            "('Pytanie 4','d','a','b','c','d')");
            System.out.println("DB created...");
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
    }*/

    /*void loadQuestions(ArrayList<Question> qBase){
        try {
            Statement statement = conn.createStatement();
            ResultSet dbResult = statement.executeQuery("SELECT * FROM pytania");
            while (dbResult.next()) {
                Question q = new Question(dbResult.getString(1), dbResult.getString(2));
                for(int i = 3; i<7; i++)
                    q.addAnswer(dbResult.getString(i));
                qBase.add(q);
            }
        }catch(SQLException e){
            System.out.println(e.getMessage());
        }
    }*/

    /*void insertResults(String s, Double d){
        PreparedStatement ps = null;
        try {
            ps = conn.prepareStatement("INSERT INTO odp_wyn(odpowiedzi, wynik) VALUES (?,?)");
            ps.setString(1, s);
            ps.setDouble(2, d);
            ps.executeUpdate();
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }

    }*/
}
