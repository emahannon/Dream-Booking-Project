package com.example.main_management.entity;

import com.example.main_management.entity.enams.RoomType;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import java.time.LocalDate;

@Entity
@Table(name = "user_booking")
public class BookInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Full name is required")
    @Size(min = 3, max = 50, message = "Full name must be between 3 and 50 characters")
    @Column(name = "full_name", nullable = false, length = 50)
    private String fullName;

    @NotNull(message = "Date of birth is required")
    @Column(name = "date_of_birth", nullable = false)
    private LocalDate dateOfBirth;

    @NotNull(message = "Gender is required")
    @Column(name = "gender", nullable = false)
    private Boolean isMale;

    @NotBlank(message = "Phone number is required")
 //   @Pattern(regexp = "^\\d{3}-\\d{3}-\\d{3}$", message = "Phone number must be in the format 000-000-000")
    @Column(name = "phone_number", nullable = false, length = 30)
    private String phoneNumber;

    @NotBlank(message = "Email is required")
    @Email(message = "Email must be in the format xxxxxx@email.com")
    @Column(name = "email", nullable = false)
    private String email;

    @NotNull(message = "Check-in date is required")
    @Column(name = "check_in_date", nullable = false)
    private LocalDate checkInDate;

    @NotNull(message = "Check-out date is required")
    @Column(name = "check_out_date", nullable = false)
    private LocalDate checkOutDate;

    @Min(value = 1, message = "Number of guests must be between 1 and 5")
    @Max(value = 5, message = "Number of guests must be between 1 and 5")
    @Column(name = "num_of_guests", nullable = false)
    private Integer numOfGuests;

    @Enumerated(EnumType.STRING)
    @Column(name = "room_type", nullable = false, length = 20)
    private RoomType roomType;

    @NotNull(message = "Breakfast included is required")
    @Column(name = "breakfast_included", nullable = false)
    private Boolean breakfastIncluded;

    @NotNull(message = "Smoking preference is required")
    @Column(name = "smoking_preference", nullable = false)
    private Boolean smokingPreference;

    @NotNull(message = "Accessibility features required is required")
    @Column(name = "accessibility_features_required", nullable = false)
    private Boolean accessibilityFeaturesRequired;

    @NotNull(message = "Extra bed needed is required")
    @Column(name = "extra_bed_needed", nullable = false)
    private Boolean extraBedNeeded;


    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room room;

    @Column(name = "total_price", nullable = false)
    private Double totalPrice;


    public BookInfo() {}

    public BookInfo(String fullName, LocalDate dateOfBirth, Boolean gender, String phoneNumber, String email,
                    LocalDate checkInDate,
                    LocalDate checkOutDate, Integer numOfGuests, String roomType, Boolean breakfastIncluded,
                    Boolean smokingPreference, Boolean accessibilityFeaturesRequired, Boolean extraBedNeeded) {
        this.fullName = fullName;
        this.dateOfBirth = dateOfBirth;
        this.isMale = gender;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.checkInDate = checkInDate;
        this.checkOutDate = checkOutDate;
        this.numOfGuests = numOfGuests;
        this.roomType = RoomType.valueOf(roomType.toUpperCase());
        this.breakfastIncluded = breakfastIncluded;
        this.smokingPreference = smokingPreference;
        this.accessibilityFeaturesRequired = accessibilityFeaturesRequired;
        this.extraBedNeeded = extraBedNeeded;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public Boolean getGender() {
        return isMale;
    }

    public void setGender(Boolean gender) {
        this.isMale = gender;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDate getCheckInDate() {
        return checkInDate;
    }

    public void setCheckInDate(LocalDate checkInDate) {
        this.checkInDate = checkInDate;
    }

    public LocalDate getCheckOutDate() {
        return checkOutDate;
    }

    public void setCheckOutDate(LocalDate checkOutDate) {
        this.checkOutDate = checkOutDate;
    }

    public Integer getNumOfGuests() {
        return numOfGuests;
    }

    public void setNumOfGuests(Integer numOfGuests) {
        this.numOfGuests = numOfGuests;
    }

    public RoomType getRoomType() {
        return roomType;
    }

    public void setRoomType(RoomType roomType) {
        this.roomType = roomType;
    }

    public Boolean getBreakfastIncluded() {
        return breakfastIncluded;
    }

    public void setBreakfastIncluded(Boolean breakfastIncluded) {
        this.breakfastIncluded = breakfastIncluded;
    }

    public Boolean getSmokingPreference() {
        return smokingPreference;
    }

    public void setSmokingPreference(Boolean smokingPreference) {
        this.smokingPreference = smokingPreference;
    }

    public Boolean getAccessibilityFeaturesRequired() {
        return accessibilityFeaturesRequired;
    }

    public void setAccessibilityFeaturesRequired(Boolean accessibilityFeaturesRequired) {
        this.accessibilityFeaturesRequired = accessibilityFeaturesRequired;
    }

    public Boolean getExtraBedNeeded() {
        return extraBedNeeded;
    }

    public void setExtraBedNeeded(Boolean extraBedNeeded) {
        this.extraBedNeeded = extraBedNeeded;
    }

    public Room getRoom() {
        return room;
    }

    public void setRoom(Room room) {
        this.room = room;
    }

    public Double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
    }


    @Override
    public String toString() {
        return "BookInfo{" +
                "id=" + id +
                ", fullName='" + fullName + '\'' +
                ", dateOfBirth=" + dateOfBirth +
                ", isMale=" + isMale +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", email='" + email + '\'' +
                ", checkInDate=" + checkInDate +
                ", checkOutDate=" + checkOutDate +
                ", numOfGuests=" + numOfGuests +
                ", roomType=" + roomType +
                ", breakfastIncluded=" + breakfastIncluded +
                ", smokingPreference=" + smokingPreference +
                ", accessibilityFeaturesRequired=" + accessibilityFeaturesRequired +
                ", extraBedNeeded=" + extraBedNeeded +
                ", room=" + room +
                ", totalPrice=" + totalPrice +
                '}';
    }
}
