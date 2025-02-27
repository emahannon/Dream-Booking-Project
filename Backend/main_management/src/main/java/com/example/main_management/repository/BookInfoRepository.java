package com.example.main_management.repository;

import com.example.main_management.entity.BookInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookInfoRepository extends JpaRepository<BookInfo, Long> {
    BookInfo findBookInfoByEmail(String email);
}
