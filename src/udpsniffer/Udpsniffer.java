/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package udpsniffer;

import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.SocketException;
import java.sql.*;
import java.util.Arrays;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author lralv
 */
public class Udpsniffer {

    /**
     * @param args the command line arguments
     * @throws java.io.IOException
     * @throws java.sql.SQLException
     */
    public static void main(String[] args) throws IOException, SQLException {
        // TODO code application logic here
        
        final int puerto = 8050;
        byte[] buffer = new byte[2000];
        
        Connection con;
        Statement st;
        
        try {
            DatagramSocket udpsocket= new DatagramSocket(puerto);
            System.out.println("Sniffer has been started");
            
            while (true){
                
                DatagramPacket request = new DatagramPacket(buffer, buffer.length);
                udpsocket.receive(request);
                String message = new String(request.getData());
                System.out.println(message);
                String[] split = message.split(" ");

                
                
                try {
                    Class.forName("com.mysql.cj.jdbc.Driver");
                    con = DriverManager.getConnection("jdbc:mysql://databasep2.csdupfcdilij.us-east-1.rds.amazonaws.com/gpsdata", "root","");
                    st = con.createStatement();
                    
                    String query = "INSERT INTO gpsdata VALUES('"+split[0]+"' , '"+split[1]+"', '"+split[2]+"', '"+split[3]+"')";
                    //String query = "INSERT INTO gpsdata VALUES('hijhuyjh','bguyhgy', 'hubuh' , 'huihgyu')";
                    //String query = "INSERT INTO gpsdata (Latitud, Longitud,)VALUES('12345' , '67890')";
                    //Table name after INTO
                    System.out.println("LLega");
                    st.executeUpdate(query);
                    
                    
                    
                    
                } catch (ClassNotFoundException ex) {
                    Logger.getLogger(Udpsniffer.class.getName()).log(Level.SEVERE, null, ex);
                }
            }
        } catch (SocketException ex) {
            Logger.getLogger(Udpsniffer.class.getName()).log(Level.SEVERE, null, ex);
        }
        
    }
    
}
