/* ============================================================
   Lab 5 - script.js
   ============================================================ */

    /* 1. DOM READY */
document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    /* 2. FOCUS / BLUR UX */
    const FOCUS_BG = "#fffae0";
    const BLUR_BG  = "white";

    const focusInputs = document.querySelectorAll("#username, #email, #password");

    focusInputs.forEach(function (input) {
        input.addEventListener("focus", function () {
            input.style.backgroundColor = FOCUS_BG;
        });

        input.addEventListener("blur", function () {
            input.style.backgroundColor = BLUR_BG;
        });
    });

    /* 3. FORM VALIDATION ON SUBMIT */
    const form = document.getElementById("signup-form");

    const username = document.getElementById("username");
    const email    = document.getElementById("email");
    const password = document.getElementById("password");
    const terms    = document.getElementById("terms");

    const usernameError = document.getElementById("error-username");
    const emailError    = document.getElementById("error-email");
    const passwordError = document.getElementById("error-password");
    const termsError    = document.getElementById("error-terms");

    const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const successMessage = document.createElement("p");
    successMessage.id = "form-success";
    successMessage.className = "success-msg";
    successMessage.setAttribute("role", "status");
    form.insertAdjacentElement("afterend", successMessage);

    function setError(field, span, message) {
        span.textContent = message;
        span.style.display = "block";
        field.classList.add("error-border");
    }

    function clearError(field, span) {
        span.textContent = "";
        span.style.display = "none";
        field.classList.remove("error-border");
    }

    function checkUsername() {
        if (username.value.trim() === "") {
            setError(username, usernameError, "Username is required");
            return false;
        }
        clearError(username, usernameError);
        return true;
    }

    function checkEmail() {
        const value = email.value.trim();
        if (value === "" || !EMAIL_RE.test(value)) {
            setError(email, emailError, "Enter a valid email address");
            return false;
        }
        clearError(email, emailError);
        return true;
    }

    function checkPassword() {
        if (password.value.length < 8) {
            setError(password, passwordError,
                "Password must be at least 8 characters");
            return false;
        }
        clearError(password, passwordError);
        return true;
    }

    function checkTerms() {
        if (!terms.checked) {
            setError(terms, termsError, "You must accept the terms");
            return false;
        }
        clearError(terms, termsError);
        return true;
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        successMessage.textContent = "";

        const usernameOK = checkUsername();
        const emailOK    = checkEmail();
        const passwordOK = checkPassword();
        const termsOK    = checkTerms();

        if (usernameOK && emailOK && passwordOK && termsOK) {
            successMessage.textContent =
                "Thanks, " + username.value.trim() +
                "! You are now a member of the Travel Photo Club.";

            form.reset();

            focusInputs.forEach(function (input) {
                input.style.backgroundColor = BLUR_BG;
            });
        }
    });

    /* 4. GALLERY INTERACTION */
    const thumbs  = document.querySelectorAll(".thumb");
    const caption = document.getElementById("image-caption");

    function selectThumb(thumb) {
        thumbs.forEach(function (t) {
            t.classList.remove("expanded");
        });
        thumb.classList.add("expanded");

        const city = thumb.dataset.city || thumb.querySelector("img").alt;
        caption.textContent = "This shot is from " + city;
    }

    thumbs.forEach(function (thumb) {

        thumb.addEventListener("click", function () {
            selectThumb(this);
        });

        thumb.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                selectThumb(this);
            }
        });
    });
});