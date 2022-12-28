import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class Server {

    public static void main(String[] args) {
        DBConnection connection = new DBConnection();
        DBCondition cond = new DBCondition();

        ServerSocket server = null;
        try {
            server = new ServerSocket(5000);
        } catch (IOException e) {
            System.out.println(e.getMessage());
        }

        ExecutorService threadPool = Executors.newFixedThreadPool(250);

        while(true){
            Socket clientSocket = null;
            try{
                clientSocket = server.accept();
                DataInputStream input = new DataInputStream (clientSocket.getInputStream());
                DataOutputStream output = new DataOutputStream (clientSocket.getOutputStream());

                ServerThread clientHandler = new ServerThread(clientSocket,  input, output, cond, connection);
                threadPool.execute(clientHandler);
            }catch(Exception e){
                System.out.println(e.getMessage());
            }
        }
    }
}
