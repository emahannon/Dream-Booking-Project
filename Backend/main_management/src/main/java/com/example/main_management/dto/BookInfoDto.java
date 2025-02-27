package com.example.main_management.dto;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class BookInfoDto {

    private Long id;

    @NotBlank(message = "Full name is required")
    @Size(min = 3, max = 50, message = "Full name must be between 3 and 50 characters")
    private String name;

    @NotNull(message = "Date of birth is required")
    @Pattern(regexp = "^\\d{4}-\\d{2}-\\d{2}$", message = "Date of birth must be in the format dd-mm-yyyy")
    private String dateOfBirth;

    @JsonProperty("isMale")
    private Boolean isMale;

    @NotBlank(message = "Phone number is required")
    private String phone;

    @NotBlank(message = "Email is required")
    @Email(message = "Email must be in the format xxxxxx@email.com")
    private String email;

    @NotNull(message = "Check-in date is required")
    @Pattern(regexp = "^\\d{4}-\\d{2}-\\d{2}$", message = "Check-in date must be in the format dd-mm-yyyy")
    private String checkInDate;

    @NotNull(message = "Check-out date is required")
    @Pattern(regexp = "^\\d{4}-\\d{2}-\\d{2}$", message = "Check-out date must be in the format dd-mm-yyyy")
    private String checkOutDate;

    private String guests;

    @NotBlank(message = "Room type is required")
    private String roomType;

    @NotNull(message = "Breakfast included is required")
    private Boolean breakfastIncluded;

    @NotNull(message = "Smoking preference is required")
    private Boolean smoking;

    @NotNull(message = "Accessibility features required is required")
    private Boolean accessibility;

    @NotNull(message = "Extra bed needed is required")
    private Boolean extraBed;

    private Long roomId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(String dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public Boolean getMale() {
        return isMale;
    }

    public void setMale(Boolean male) {
        isMale = male;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCheckInDate() {
        return checkInDate;
    }

    public void setCheckInDate(String checkInDate) {
        this.checkInDate = checkInDate;
    }

    public String getCheckOutDate() {
        return checkOutDate;
    }

    public void setCheckOutDate(String checkOutDate) {
        this.checkOutDate = checkOutDate;
    }

    public String getGuests() {
        return guests;
    }

    public void setGuests(String guests) {
        this.guests = guests;
    }

    public String getRoomType() {
        return roomType;
    }

    public void setRoomType(String roomType) {
        this.roomType = roomType;
    }

    public Boolean getBreakfastIncluded() {
        return breakfastIncluded;
    }

    public void setBreakfastIncluded(Boolean breakfastIncluded) {
        this.breakfastIncluded = breakfastIncluded;
    }

    public Boolean getSmoking() {
        return smoking;
    }

    public void setSmoking(Boolean smoking) {
        this.smoking = smoking;
    }

    public Boolean getAccessibility() {
        return accessibility;
    }

    public void setAccessibility(Boolean accessibility) {
        this.accessibility = accessibility;
    }

    public Boolean getExtraBed() {
        return extraBed;
    }

    public void setExtraBed(Boolean extraBed) {
        this.extraBed = extraBed;
    }


    public Long getRoomId() {
        return roomId;
    }

    public void setRoomId(Long roomId) {
        this.roomId = roomId;
    }

    @Override
    public String toString() {
        return "BookInfoDto{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", dateOfBirth='" + dateOfBirth + '\'' +
                ", isMale=" + isMale +
                ", phone='" + phone + '\'' +
                ", email='" + email + '\'' +
                ", checkInDate='" + checkInDate + '\'' +
                ", checkOutDate='" + checkOutDate + '\'' +
                ", guests=" + guests +
                ", roomType='" + roomType + '\'' +
                ", breakfastIncluded=" + breakfastIncluded +
                ", smoking=" + smoking +
                ", accessibility=" + accessibility +
                ", extraBed=" + extraBed +
                '}';
    }
}

