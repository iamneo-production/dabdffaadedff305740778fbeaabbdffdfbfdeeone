package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.Book;
import com.examly.springapp.repository.BookRepo;

@Service
public class BookService {

    @Autowired
    private BookRepo bookRepo;

    public boolean addBook(Book book) {
        return bookRepo.save(book) != null ? true : false;
    }
        
    
    public List <Book> getAllBooks()
    {
        return bookRepo.findAll();
    }

   
}
