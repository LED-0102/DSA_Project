# DSA Project - Attendance Taking Website

This project is a web-based attendance taking website developed using Rust, Python, and Node.js. It allows you to track and manage attendance for various events or classes.

## Prerequisites

Before you can run this application, ensure that you have the following dependencies installed on your device:

- Rust
- Python
- Node.js

## Getting Started

1. Fork this repository to your own GitHub account.

2. Switch to the master branch of your forked repository.

3. Navigate to the frontend directory of the project and install the required Node.js packages by running:


4. Switch to the backend directory of the project and build the Rust application by running:

```shell
cd backend
cargo build
cargo run


Switch back to the frontend directory and start the frontend application by running:
npm start


cd frontend/src (or .src if you are on frontend)
uvicorn --reload main:app --port 8000
