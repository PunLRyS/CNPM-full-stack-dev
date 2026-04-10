package com.cnpm.store.auth;

import com.cnpm.store.auth.dto.AuthResponse;
import com.cnpm.store.auth.dto.LoginRequest;
import com.cnpm.store.auth.dto.RegisterRequest;
import com.cnpm.store.user.UserEntity;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public AuthResponse login(@Valid @RequestBody LoginRequest request) {
        return authService.login(request);
    }

    @PostMapping("/register")
    public UserEntity register(@Valid @RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    @PostMapping("/protected")
    public Map<String, String> protectedRoute() {
        return Map.of("message", "This route is protected!");
    }
}
