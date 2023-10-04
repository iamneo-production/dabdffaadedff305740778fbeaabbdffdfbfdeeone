package com.examly.springapp.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.model.Book;
import com.examly.springapp.service.BookService;

@RestController
public class ApiController {

    @Autowired
    private BookService bookService;

    @CrossOrigin(origins = "https://8081-dabdffaadedff305740778fbeaabbdffdfbfdeeone.premiumproject.examly.io")
    @PostMapping("/addBook")
    public boolean addBook(@RequestBody Book book)
    {
        return bookService.addBook(book);
    }

    @CrossOrigin(origins = "https://8081-dabdffaadedff305740778fbeaabbdffdfbfdeeone.premiumproject.examly.io")
    @GetMapping("/getAllBook")
    public List <Book> getAllBooks()
    {
        return bookService.getAllBooks();
    }

   
    
}
