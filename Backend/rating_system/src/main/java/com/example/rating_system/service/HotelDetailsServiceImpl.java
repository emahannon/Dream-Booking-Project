package com.example.rating_system.service;

import com.example.rating_system.models.HotelDetail;
import com.example.rating_system.models.Review;
import com.example.rating_system.repository.HotelDetailsRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class HotelDetailsServiceImpl implements HotelDetailsService {

    private final HotelDetailsRepository hotelDetailsRepository;
    private final RabbitTemplate rabbitTemplate;

    @Value("${rabbitmq.queue}")
    private String queueName;

    public HotelDetailsServiceImpl(HotelDetailsRepository hotelDetailsRepository, RabbitTemplate rabbitTemplate) {
        this.hotelDetailsRepository = hotelDetailsRepository;
        this.rabbitTemplate = rabbitTemplate;
    }

    @Override
    public HotelDetail addHotelDetails(HotelDetail hotelDetails) {
        return hotelDetailsRepository.save(hotelDetails);
    }

    @Override
    public HotelDetail getHotelDetails(long hotelId) {
        return hotelDetailsRepository.findByHotelId(hotelId);
    }

    @Override
    public HotelDetail addReviewToHotel(long hotelId, Review review) {
        HotelDetail hotelDetails = hotelDetailsRepository.findByHotelId(hotelId);
        if (hotelDetails == null) {
            throw new HotelNotFoundException("Hotel not found with ID: " + hotelId);
        }
        review.setCreatedAt(String.valueOf(LocalDateTime.now()));
        hotelDetails.getReviews().add(review);
        return hotelDetailsRepository.save(hotelDetails);
    }

    @Override
    public HotelDetail addPhotoToHotel(long hotelId, String photo) {
        HotelDetail hotelDetails = hotelDetailsRepository.findByHotelId(hotelId);
        if (hotelDetails == null) {
            throw new HotelNotFoundException("Hotel not found with ID: " + hotelId);
        }
        hotelDetails.getPhotos().add(photo);
        return hotelDetailsRepository.save(hotelDetails);
    }

    @Override
    public List<Review> getAllReviewsByHotelId(long hotelId) {
        HotelDetail hotelDetails = hotelDetailsRepository.findByHotelId(hotelId);
        if (hotelDetails != null) {
            return hotelDetails.getReviews();
        }
        return List.of();
    }

    @Override
    public Double getAvrRating(long hotelId) {
        HotelDetail hotelDetails = hotelDetailsRepository.findByHotelId(hotelId);
        if (hotelDetails == null) {
            throw new HotelNotFoundException("Hotel not found with ID: " + hotelId);
        }

       Double averageRating = Double.valueOf(hotelDetails.getReviews().stream()
                .mapToInt(Review::getRating)
                .average()
                .orElse(0.0));

        publishAverageRatingToRabbitMQ(hotelId, averageRating);

        return averageRating;
    }

    private void publishAverageRatingToRabbitMQ(long hotelId, Double averageRating) {
        Map<String, Object> message = new HashMap<>();
        message.put("hotelId", hotelId);
        message.put("averageRating", averageRating);

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            String jsonString = objectMapper.writeValueAsString(message);

            rabbitTemplate.convertAndSend(queueName, jsonString);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }




}
