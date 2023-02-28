## Introduction

This is an expense tracker application used to track expenses and manage budgets.

## Features

This app has the following features:

1. Adding incomes and expenses.
2. Viewing transactions by date
3. Editing added transactions

## Components

The main components of an expense tracker app include:

1. TransactionsList: displays a list of expenses sorted by date
2. TransactionForm: allows users to add a new transaction with a description, date, and amount
3. TransactionDetail: displays details of a transactions and provides options for editing and deleting.

## Navigation

NavigationContainer is used for navigating between MainScreen and ProfileScreen

## Data Management

The transaction data is stored using AsyncStorage and Context API is used to manage application state and ensure data consistency across the app.
Reudx is used to store profile data.
