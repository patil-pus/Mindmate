[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/6xRviSdT)
# Welcome to the course CSYE6200- Concepts of Object Oriented Design
> Northeastern University, College of Engineering


## Professor: Daniel Peters

### Requirements
1. Eclipse or VS Code or IntelliJ.

Note: If you are using Eclipse, please have git CLI installed on your system or GitHub Desktop to commit the code in this repository

### SetUp Instructions
1. Please clone the repository on your local system
2. For Eclipse Import the project as Existing Maven Project, For IntelliJ you can directlty open it using 'Get from VCS'.
4. All code should be pushed to the main branch
3. Ensure the GitHub actions are successful post push

Submissions will have deadlines, failed GitHub Actions would result in point deductions.

### References
1. Cloning a Repository: <https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository>
2. Any GitHub Setup: Please refer to the Git & GitHub Fundamentals Repository shared to you by your respective TA and refer the README.md section

Please reach out to your respective TA if you need any help in regards with submission/ GitHub

Author:
- Rohan Vasudev Ginde (ginde.r@northeastern.edu)
- Yesha Joshi (joshi.ye@northeastern.edu)


### **MindMate - README**

---

#### **Overview**

**MindMate** is a mental health chat application built using Java Spring Boot for the backend and Next.js for the frontend. It facilitates secure real-time communication between clients and therapists, enabling session booking, profile management, and journal functionalities.

---

### **Key Features**
- User Authentication (JWT).
- Real-time chat using WebSockets.
- Session booking and management.
- Client and therapist profiles.
- Journal entries for mental health tracking.
- Stripe payment integration.

---

#### **Tech Stack**
- **Backend**: Java Spring Boot.
- **Frontend**: Next.js (React), TailwindCSS.
- **Database**: MySQL.
- **Authentication**: JWT.
- **Payment**: Stripe API integration.

---

### **Getting Started**

#### **Prerequisites**
1. **Java** (version 11 or higher)
2. **Node.js** (version 16 or higher) and npm/yarn.
3. **MySQL** database installed locally or on a server.

#### **Project Structure**
```
.
├── backend
│   ├── src/main/java/edu/neu/csye6200
│   ├── src/main/resources
│   └── pom.xml
└── frontend
    ├── public
    ├── src
    └── package.json
```

---

### **Backend Setup**

1. **Navigate to the `backend` folder**:
   ```bash
   cd backend
   ```

2. **Set up the database**:
   - Create a MySQL database called `mindmate` (or update the name in `application.properties`).
   - Update `src/main/resources/application.properties`:
     ```properties
     spring.datasource.url=jdbc:mysql://localhost:3306/mindmate
     spring.datasource.username=<your_mysql_username>
     spring.datasource.password=<your_mysql_password>
     spring.jpa.hibernate.ddl-auto=update
     spring.jpa.show-sql=true
     spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL5Dialect
     ```

3. **Build and Run**:
   - Build the backend:
     ```bash
     mvn clean install
     ```
   - Start the backend server:
     ```bash
     mvn spring-boot:run
     ```
   - The backend should now be running at `http://localhost:8080`.

4. **API Documentation**:
   - Visit `http://localhost:8080/swagger-ui.html` (if Swagger is enabled) for detailed API documentation.

---

### **Frontend Setup**

1. **Navigate to the `frontend` folder**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   - Create a `.env.local` file in the `frontend` directory:
     ```env
     NEXT_PUBLIC_BACKEND_URL=http://localhost:8080
     NEXT_PUBLIC_STRIPE_PUBLIC_KEY=<your_stripe_public_key>
     ```

4. **Start the frontend**:
   ```bash
   npm run dev
   ```
   - The frontend should now be running at `http://localhost:3000`.

---

### **How to Use**

1. **Run both the backend and frontend**:
   - Ensure the backend is running on `http://localhost:8080`.
   - Start the frontend on `http://localhost:3000`.

2. **Access the app**:
   - Navigate to `http://localhost:3000` in your browser.

3. **Register and Login**:
   - Use the app to sign up as a client or therapist and explore functionalities like booking sessions, chatting, and managing profiles.

---


### **Development Workflow**

#### **Backend**
- Use Maven for dependency management:
  ```bash
  mvn clean install
  ```
- Run tests:
  ```bash
  mvn test
  ```

#### **Frontend**
- Start the development server:
  ```bash
  npm run dev
  ```
- Build for production:
  ```bash
  npm run build
  ```

---

### **Contributing**
1. Fork the repository.
2. Create a new branch for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes and push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
4. Submit a pull request.

---

### **License**
This project is licensed under the MIT License. See the `LICENSE` file for more details.

---

### **Contact**
For any questions or issues, please reach out to the team:

- **Sahana Jayadeva Prakash**: [jayadevaprakash.s@northeastern.edu](mailto:jayadevaprakash.s@northeastern.edu)
- **Rutuja Patil**: [patil.rut@northeastern.edu](mailto:patil.rut@northeastern.edu)
- **Bhagyashree Chavan**: [chavan.b@northeastern.edu](mailto:chavan.b@northeastern.edu)
- **Pushkar Patil**: [patil.pus@northeastern.edu](mailto:patil.pus@northeastern.edu)
- **Sonal Takalikar**: [takalikar.s@northeastern.edu](mailto:takalikar.s@northeastern.edu)

--- 

Enjoy building with **MindMate**! 😊