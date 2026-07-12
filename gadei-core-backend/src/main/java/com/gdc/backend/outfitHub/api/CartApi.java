package com.gdc.backend.outfitHub.api;

import java.util.List;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gdc.backend.outfitHub.ds.CartItem;
import com.gdc.backend.outfitHub.services.CartService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class CartApi {
    private final CartService cartService;

    @QueryMapping
    public Integer cartSize(){
        return cartService.getCartSize();
    }

    @QueryMapping
    public double cartPrice(){
        return cartService.getTotalPrice();
    }

    @QueryMapping
    public List<CartItem> allCartItems() {
        return cartService.getAllCartItems();
    }

    @MutationMapping
    public Integer addToCart(@Argument CartItem cartItem) {
        cartService.addToCart(cartItem);
        return cartService.getCartSize();
    }

    @MutationMapping
    public Integer removeFromCart(@Argument CartItem cartItem) {
        cartService.removeFromCart(cartItem);
        return cartService.getCartSize();
    }
    
    @MutationMapping
    public Integer removeCertainItem(@Argument CartItem cartItem) {
    	cartService.removeCertainItem(cartItem);
    	return cartService.getCartSize();
    }
}
