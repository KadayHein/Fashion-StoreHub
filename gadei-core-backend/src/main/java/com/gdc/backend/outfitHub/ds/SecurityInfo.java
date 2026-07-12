package com.gdc.backend.outfitHub.ds;

import com.gdc.backend.outfitHub.entities.Account.Role;

public record SecurityInfo (String email,
                            String fullName,
                            Role role,
                            String phoneNumber,
                            String token){

    public static class Builder {
        private String email;
        private String fullName;
        private Role role;
        private String phoneNumber;
        private String token;

        public Builder email(String email){
            this.email = email;
            return this;
        }

        public Builder fullName(String fullName){
            this.fullName = fullName;
            return this;
        }

        public Builder role(Role role){
            this.role = role;
            return this;
        }

        public Builder phoneNumber(String phoneNumber){
            this.phoneNumber = phoneNumber;
            return this;
        }

        public Builder token(String token){
            this.token = token;
            return this;
        }

        public SecurityInfo build(){
            return new SecurityInfo(email,fullName,role,phoneNumber,token);
        }
    }
}
