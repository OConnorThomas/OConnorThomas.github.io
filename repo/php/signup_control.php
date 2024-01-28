<?php

declare(strict_types=1);

function is_input_empty(string $firstName, string $lastName, string $username, string $email, string $pwd): bool
{
    return (empty($firstName) || empty($lastName) || empty($username) || empty($email) || empty($pwd));
}

function is_email_invalid(string $email): bool
{
    return (!filter_var($email, FILTER_VALIDATE_EMAIL));
}

function is_username_taken(object $pdo, string $username): bool
{
    return (is_array(get_username($pdo, $username)));
}

function is_email_registered(object $pdo, string $email): bool
{
    return (is_array(get_email($pdo, $email)));
}

function create_user(object $pdo, string $firstName, string $lastName, string $username, string $email, string $password)
{
    set_user($pdo, $firstName, $lastName, $username, $email, $password);
}

function do_passwords_match(string $password, string $rePassword): bool
{
    return ($password === $rePassword);
}