package com.gdc.backend.outfitHub.ds;
import java.util.HashSet;
import java.util.Set;
import org.springframework.stereotype.Component;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@Component
@NoArgsConstructor @AllArgsConstructor
public class Cart {
    private Set<CartItem> cartItems = new HashSet<>();
    private Integer totalQuantity = 0;

    public void addItem(CartItem cartItem){
        boolean isItemExist = this.cartItems.stream()
                .filter(item -> item.getProductId().equals(cartItem.getProductId()))
                .findFirst()
                .map(item -> {
                    item.setPrice(item.getPrice()+(item.getPrice()/item.getQuantity()));
                    item.setQuantity(item.getQuantity()+1);
                    System.out.println("Same CartItem added!");
                    return true;}).orElse(false);
        if(!isItemExist){
            System.out.println("New CartItem Added!");
            this.cartItems.add(cartItem);
        }
        this.totalQuantity += 1;
    }

    public void removeItem(CartItem cartItem){
        boolean isItemExist = this.cartItems.stream()
                .filter(item -> item.getProductId().equals(cartItem.getProductId()))
                .findFirst()
                .map(item -> {
                    if(item.getQuantity() > 1){
                        item.setPrice(item.getPrice() - (cartItem.getPrice() / item.getQuantity()));
                        item.setQuantity(item.getQuantity()-1);
                        System.out.println("One of Multiple CartItems Removed!");
                    } else {
                        this.cartItems.remove(item);
                        System.out.println("All CartItem removed!");
                    }
                    return true;}).orElse(false);
        if(!isItemExist){
            System.out.println("CartItem u wanna remove doesn't exist!");
        }
        this.totalQuantity -= 1;
    }
    
    public void removeCertainItem(CartItem cartItem) {
    	boolean removed = cartItems.removeIf(item -> item.getProductId().equals(cartItem.getProductId()));
        if(!removed){
            System.out.println("CartItem u wanna remove doesn't exist!");
        }
    }
}
