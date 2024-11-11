package edu.neu.csye6200.Models;

import javax.persistence.*;
import java.util.Date;
@MappedSuperclass
public abstract class Journal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "entryDate")
    private Date entryDate;

    @Column(name = "content")
    private String content;

    public Journal(Date entryDate, String content) {
        this.entryDate = entryDate;
        this.content = content;
    }
    public Journal() {}
    public int getId() {
        return id;
    }

    public Date getEntryDate() {
        return entryDate;
    }

    public void setEntryDate(Date entryDate) {
        this.entryDate = entryDate;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
    public abstract void displayEntry();
}
