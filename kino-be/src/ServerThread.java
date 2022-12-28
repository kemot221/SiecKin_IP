import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.net.Socket;

public class ServerThread extends Thread{

    Socket clientSocket;
    DataInputStream input;
    DataOutputStream output;
    DBCondition condition;
    DBConnection connection;

    ServerThread(Socket s, DataInputStream i,DataOutputStream o, DBCondition c, DBConnection conn){
        clientSocket = s;
        input = i;
        output = o;
        condition = c;
        connection = conn;
    }

    public void run(){

    }
}
