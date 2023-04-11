from django.contrib.auth.base_user import BaseUserManager


class CustomUserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        """
        Creates and saves a User with the given email and password.
        """
        if not email:
            raise ValueError("User must have an email")
        if not password:
            raise ValueError("User must have a password")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault("role", 0)
        return self._create_user(email, password, **extra_fields)

    def create_admin(self, email, password, **extra_fields):
        extra_fields.setdefault("role", 1)

        if extra_fields.get("role") != 1:
            raise ValueError("Admin must have role=1.")

        return self._create_user(email, password, **extra_fields)
