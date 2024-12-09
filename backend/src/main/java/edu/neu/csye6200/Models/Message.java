package edu.neu.csye6200.Models;
import edu.neu.csye6200.enums.Status;
import lombok.*;
import java.util.Date;
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Message {
    private String senderName;
    private String receiverName;
    private String message;
    private String date;
    private Status status;
    public String getSenderName() {
        return senderName;
    }
    public String getReceiverName() {
        return receiverName;
    }
    public String getMessage() {
        return message;
    }
    public String getDate() {
        return date;
    }
    public Status getStatus() {
        return status;
    }
}