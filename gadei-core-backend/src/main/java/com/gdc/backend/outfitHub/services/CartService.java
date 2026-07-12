package com.gdc.backend.outfitHub.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.gdc.backend.outfitHub.ds.Cart;
import com.gdc.backend.outfitHub.ds.CartItem;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CartService {
    private final Cart cart;

    public Integer getCartSize() {
        Integer cartSize = 0;
        for(CartItem cartItem : cart.getCartItems()) {
            cartSize += cartItem.getQuantity();
        }
        return cartSize;
    }

    public double getTotalPrice(){
        double totalPrice = 0.0;
        for (CartItem cartItem : cart.getCartItems()){
            totalPrice += cartItem.getPrice() * cartItem.getQuantity();
        }
        return totalPrice;
    }

    public List<CartItem> getAllCartItems() {
        return cart.getCartItems().stream().toList();
    }

    public void addToCart(CartItem cartItem) {
        cart.addItem(cartItem);
    }

    public void removeFromCart(CartItem cartItem){
        cart.removeItem(cartItem);
    }
    
    public void removeCertainItem(CartItem cartItem) {
    	cart.removeCertainItem(cartItem);
    }
}
