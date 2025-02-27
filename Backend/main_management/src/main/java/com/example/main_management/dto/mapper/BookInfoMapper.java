package com.example.main_management.dto.mapper;

import com.example.main_management.dto.BookInfoDto;
import com.example.main_management.entity.BookInfo;
import com.example.main_management.entity.enams.RoomType;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class BookInfoMapper {

    public static BookInfo convertToEntity(BookInfoDto bookInfoDto){
        BookInfo bookInfo = new BookInfo();
        bookInfo.setFullName(bookInfoDto.getName());
        bookInfo.setDateOfBirth( LocalDate.parse(bookInfoDto.getDateOfBirth(), DateTimeFormatter.ISO_LOCAL_DATE));
        bookInfo.setGender(bookInfoDto.getMale());
        bookInfo.setPhoneNumber(bookInfoDto.getPhone());
        bookInfo.setEmail(bookInfoDto.getEmail());
        bookInfo.setCheckInDate(LocalDate.parse(bookInfoDto.getCheckInDate(), DateTimeFormatter.ISO_LOCAL_DATE));
        bookInfo.setCheckOutDate(LocalDate.parse(bookInfoDto.getCheckOutDate(), DateTimeFormatter.ISO_LOCAL_DATE));
        bookInfo.setNumOfGuests(Integer.valueOf(bookInfoDto.getGuests()));
        bookInfo.setRoomType(RoomType.valueOf(bookInfoDto.getRoomType().toUpperCase()));
        bookInfo.setBreakfastIncluded(bookInfoDto.getBreakfastIncluded());
        bookInfo.setSmokingPreference(bookInfoDto.getSmoking());
        bookInfo.setAccessibilityFeaturesRequired(bookInfoDto.getAccessibility());
        bookInfo.setExtraBedNeeded(bookInfoDto.getExtraBed());
        return bookInfo;
    }


}
