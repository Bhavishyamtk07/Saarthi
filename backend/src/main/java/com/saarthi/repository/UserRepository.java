package com.saarthi.repository;

import com.saarthi.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Boolean existsByEmail(String email);
    List<User> findByRole(User.Role role);
    List<User> findBySchool(String school);
    List<User> findByRoleAndSchool(User.Role role, String school);
}
