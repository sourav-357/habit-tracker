# Habits Tracker - Professional Habit Management Application

A modern, production-ready web application for tracking and managing daily habits with professional analytics, built with Node.js, React, and MongoDB.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [API Documentation](#api-documentation)
- [Frontend Features](#frontend-features)
- [Backend Features](#backend-features)
- [Database Schema](#database-schema)
- [Configuration](#configuration)
- [Development](#development)
- [Deployment](#deployment)
- [Best Practices](#best-practices)
- [Contributing](#contributing)
- [License](#license)

## Overview


Habits Tracker is a comprehensive habit management system designed for professionals and individuals looking to build and maintain better habits. The application provides intuitive tracking, detailed analytics, and professional insights into habit formation patterns.

**Key Highlights:**
- Professional, modern UI with dark mode support
- Real-time habit tracking and logging
- Advanced analytics with multiple chart types
- Responsive design for all devices
- Secure JWT-based authentication
- RESTful API architecture

## Features

### User Management
- User registration with email validation
- Secure login with JWT authentication
- Persistent sessions with token management
- Profile customization (name, bio, timezone, theme preference)
- User profile management and settings

### Habit Creation & Management
- Create habits with custom properties
- 8 habit categories (Health, Fitness, Learning, Productivity, Wellness, Social, Finance, Other)
- Customizable icons and colors for visual distinction
- Set frequency (daily, weekly, monthly)
- Define targets with different units (times, minutes, hours, km, pages, cups)
- Optional reminder times
- Edit and delete habits
- Enable/disable habits without deletion

### Habit Tracking
- Mark habits as complete/incomplete
- Log with optional notes and mood tracking
- Mood options: excellent, good, neutral, poor, terrible
- Daily habit logging with timestamp
- Update historical logs

### Analytics & Insights
- **Daily Analytics**: 30-day completion trends
- **Weekly Analytics**: 12-week performance overview
- **Monthly Analytics**: 12-month historical view
- **Yearly Analytics**: 3-year long-term tracking
- **Habit Performance**: Individual habit metrics
  - Completion percentage
  - Completion streaks
  - Total completions
  - Performance trends
- **Dashboard Statistics**:
  - Total active habits
  - Today's completion percentage
  - This month's completion statistics
  - Consistency metrics

### Data Visualization
- **Line Charts**: Trend analysis over time
- **Bar Charts**: Weekly/monthly comparisons
- **Area Charts**: Daily progress visualization
- **Pie Charts**: Habit distribution by category
- **Progress Rings**: Real-time completion rates
- Interactive tooltips and legends

### User Interface
- Professional dashboard with at-a-glance metrics
- Responsive sidebar navigation
- Mobile-friendly design
- Dark/Light theme toggle
- Habit cards with quick actions
- Search and filter functionality
- Toast notifications for user feedback
- Loading states and skeleton screens

## Technology Stack

### Frontend
| Technology | Version | Usage |
|---|---|---|
| [React](https://react.dev/) | 18.2+ | UI library and component framework |
| [Vite](https://vitejs.dev/) | 5.0+ | Fast build tool and dev server |
| [React Router](https://reactrouter.com/) | 6.18+ | Client-side routing and navigation |
| [Axios](https://axios-http.com/) | 1.6+ | HTTP client for API requests |
| [Tailwind CSS](https://tailwindcss.com/) | 3.3+ | Utility-first CSS framework |
| [Shadcn/ui](https://ui.shadcn.com/) | Latest | High-quality React components |
| [Recharts](https://recharts.org/) | 2.10+ | Composable charting library |
| [Lucide React](https://lucide.dev/) | 0.292+ | Beautiful icon library |
| [date-fns](https://date-fns.org/) | 2.30+ | Date utility library |
| [Radix UI](https://www.radix-ui.com/) | Latest | Unstyled, accessible components |
| [Class Variance Authority](https://cva.style/) | 0.7+ | CSS-in-JS utility |

### Backend
| Technology | Version | Usage |
|---|---|---|
| [Node.js](https://nodejs.org/) | 14+ | JavaScript runtime |
| [Express.js](https://expressjs.com/) | 4.18+ | Web framework |
| [MongoDB](https://www.mongodb.com/) | 4.0+ | NoSQL database |
| [Mongoose](https://mongoosejs.com/) | 7.0+ | MongoDB object modeling |
| [JWT](https://jwt.io/) | 9.0+ | JSON Web Tokens for auth |
| [bcryptjs](https://github.com/dcodeIO/bcrypt.js) | 2.4+ | Password hashing |
| [CORS](https://expressjs.com/en/resources/middleware/cors.html) | 2.8+ | Cross-origin resource sharing |
| [dotenv](https://github.com/motdotla/dotenv) | 16.0+ | Environment variable management |
| [express-validator](https://express-validator.github.io/) | 7.0+ | Input validation |

### Development Tools
- ESLint for code quality
- Prettier for code formatting
- Nodemon for auto-reload during development
- PostCSS for CSS processing

## Project Structure

```
Habits Tracker/
├── client/                           # Frontend React application
│   ├── public/                       # Static assets
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/                   # Shadcn/ui components
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Card.jsx
│   │   │   │   ├── Input.jsx
│   │   │   │   ├── Label.jsx
│   │   │   │   ├── Progress.jsx
│   │   │   │   ├── Badge.jsx
│   │   │   │   ├── Alert.jsx
│   │   │   │   ├── Dialog.jsx
│   │   │   │   ├── Select.jsx
│   │   │   │   ├── Textarea.jsx
│   │   │   │   ├── Tabs.jsx
│   │   │   │   └── Spinner.jsx
│   │   │   ├── Layout.jsx             # Main layout with sidebar
│   │   │   └── HabitCard.jsx          # Reusable habit card component
│   │   ├── context/
│   │   │   └── AuthContext.jsx        # Global auth state
│   │   ├── hooks/
│   │   │   └── useAuth.js             # Auth hook
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx          # Login page
│   │   │   ├── RegisterPage.jsx       # Registration page
│   │   │   ├── DashboardPage.jsx      # Main dashboard
│   │   │   ├── HabitsPage.jsx         # Habits list
│   │   │   ├── AddHabitPage.jsx       # Create new habit
│   │   │   ├── EditHabitPage.jsx      # Edit existing habit
│   │   │   ├── AnalyticsPage.jsx      # Analytics and charts
│   │   │   ├── ProfilePage.jsx        # User profile
│   │   │   └── NotFoundPage.jsx       # 404 page
│   │   ├── services/
│   │   │   ├── api.js                 # Axios instance with interceptors
│   │   │   ├── authService.js         # Auth API calls
│   │   │   ├── habitService.js        # Habit API calls
│   │   │   └── analyticsService.js    # Analytics API calls
│   │   ├── utils/
│   │   │   └── cn.js                  # Class name utility
│   │   ├── App.jsx                    # Main app component
│   │   ├── main.jsx                   # Entry point
│   │   └── index.css                  # Global styles
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── .eslintrc.cjs
│
├── server/                            # Backend Node.js application
│   ├── config/
│   │   └── db.js                      # MongoDB configuration
│   ├── controllers/
│   │   ├── authController.js          # Auth logic
│   │   ├── habitController.js         # Habit logic
│   │   └── analyticsController.js     # Analytics logic
│   ├── middleware/
│   │   └── auth.js                    # JWT verification middleware
│   ├── models/
│   │   ├── User.js                    # User schema
│   │   ├── Habit.js                   # Habit schema
│   │   └── HabitLog.js                # Habit log schema
│   ├── routes/
│   │   ├── auth.js                    # Auth endpoints
│   │   ├── habits.js                  # Habit endpoints
│   │   └── analytics.js               # Analytics endpoints
│   ├── server.js                      # Express server setup
│   ├── package.json
│   └── .env.example
│
└── README.md                          # This file
```

## Installation & Setup

### Prerequisites
- **Node.js** v14+ ([Download](https://nodejs.org/))
- **npm** or **yarn** package manager
- **MongoDB** ([Create Free Cluster](https://www.mongodb.com/cloud/atlas))
- **Git** for version control

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd "Habits Tracker"
```

### Step 2: Backend Setup

```bash
cd server

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Configure .env with your MongoDB URI and JWT secret
# Edit .env and add:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/habits-tracker
# JWT_SECRET=your-secret-key-here
# JWT_EXPIRE=7d
# PORT=5000
```

### Step 3: Frontend Setup

```bash
cd ../client

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# The default API URL is http://localhost:5000/api
# You can modify VITE_API_URL in .env if needed
```

### Step 4: Run the Application

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
# Server will run on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
# App will open at http://localhost:3000
```

### Step 5: Access the Application

Open your browser and navigate to `http://localhost:3000`

- Create a new account or use test credentials
- Start creating habits and tracking your progress

## API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register
```
POST /auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securepassword",
  "firstName": "John",
  "lastName": "Doe"
}

Response: 201 Created
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "userId",
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

#### Login
```
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword"
}

Response: 200 OK
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { ... }
}
```

#### Get Current User
```
GET /auth/me
Authorization: Bearer {token}

Response: 200 OK
{
  "user": {
    "id": "userId",
    "username": "johndoe",
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "bio": "...",
    "theme": "light",
    "timezone": "UTC"
  }
}
```

#### Update Profile
```
PUT /auth/profile
Authorization: Bearer {token}
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "bio": "Updated bio",
  "theme": "dark",
  "timezone": "EST"
}

Response: 200 OK
```

### Habit Endpoints

#### Create Habit
```
POST /habits
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Morning Meditation",
  "description": "10 minutes of meditation",
  "category": "Wellness",
  "color": "#3b82f6",
  "icon": "🧘",
  "frequency": "daily",
  "target": 10,
  "targetUnit": "minutes",
  "reminderTime": "09:00"
}

Response: 201 Created
```

#### Get All Habits
```
GET /habits
Authorization: Bearer {token}

Response: 200 OK
{
  "habits": [...],
  "count": 5
}
```

#### Get Single Habit
```
GET /habits/{habitId}
Authorization: Bearer {token}

Response: 200 OK
```

#### Update Habit
```
PUT /habits/{habitId}
Authorization: Bearer {token}
Content-Type: application/json

{ updated fields }
```

#### Delete Habit
```
DELETE /habits/{habitId}
Authorization: Bearer {token}

Response: 200 OK
```

#### Log Habit Completion
```
POST /habits/log/add
Authorization: Bearer {token}
Content-Type: application/json

{
  "habitId": "habitId",
  "completed": true,
  "value": 1,
  "notes": "Great session",
  "mood": "excellent"
}

Response: 200 OK
```

#### Get Habit Logs
```
GET /habits/logs/all?habitId={habitId}&startDate={date}&endDate={date}
Authorization: Bearer {token}

Response: 200 OK
```

### Analytics Endpoints

#### Daily Analytics (Last 30 days)
```
GET /analytics/daily?days=30
Authorization: Bearer {token}

Response: 200 OK
{
  "data": [
    {
      "date": "2024-01-01",
      "completed": 8,
      "total": 10,
      "percentage": 80
    }
  ]
}
```

#### Weekly Analytics (Last 12 weeks)
```
GET /analytics/weekly?weeks=12
Authorization: Bearer {token}
```

#### Monthly Analytics (Last 12 months)
```
GET /analytics/monthly?months=12
Authorization: Bearer {token}
```

#### Yearly Analytics (Last 3 years)
```
GET /analytics/yearly?years=3
Authorization: Bearer {token}
```

#### Habit Performance
```
GET /analytics/performance
Authorization: Bearer {token}

Response: 200 OK
{
  "performance": [
    {
      "habitId": "habitId",
      "name": "Meditation",
      "completed": 25,
      "total": 30,
      "percentage": 83,
      "streak": 5
    }
  ]
}
```

#### Dashboard Statistics
```
GET /analytics/dashboard/stats
Authorization: Bearer {token}

Response: 200 OK
{
  "stats": {
    "totalHabits": 5,
    "completedToday": 4,
    "totalLogsToday": 5,
    "completedThisMonth": 85,
    "todayPercentage": 80,
    "monthPercentage": 75
  }
}
```

### Health Check

```
GET /api/health

Response: 200 OK
{
  "message": "Server is running"
}
```

## Frontend Features

### Pages

#### Authentication Pages
- **Login**: Secure login with email and password
- **Register**: New user registration with profile setup

#### Dashboard
- Quick overview of daily progress
- Habit cards with quick complete/incomplete toggle
- Weekly completion trend chart
- Category distribution pie chart
- Summary statistics cards
- Direct access to add new habits

#### Habits Management
- List all habits with search and filter
- Filter by category
- View habit details
- Edit existing habits
- Delete habits with confirmation
- Full habit customization

#### Add/Edit Habits
- Intuitive form with validation
- Icon and color selection
- Category selection
- Frequency and target configuration
- Optional reminder time setup
- Real-time form validation

#### Analytics
- **Daily Analytics**: Line chart showing daily progress
- **Weekly Analytics**: Bar chart comparing weekly completions
- **Monthly Analytics**: Line chart for monthly trends
- **Yearly Analytics**: Bar chart for yearly overview
- Top 5 habits with performance metrics
- Category distribution visualization
- Overall completion statistics
- Streak tracking

#### Profile
- Edit profile information (first name, last name, bio)
- Theme preference (light/dark)
- Timezone selection
- Account information display
- Member since date
- Sign out functionality

### Components

#### UI Components
- Button (multiple variants and sizes)
- Card (with header, content, footer)
- Input (text, time, number)
- Label
- Progress bar
- Badge (multiple variants)
- Alert (success, warning, destructive)
- Dialog/Modal
- Select dropdown
- Textarea
- Tabs
- Spinner/Loading indicator

#### Custom Components
- **Layout**: Main application layout with sidebar navigation
- **HabitCard**: Reusable habit display component

### Styling

- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **Shadcn/ui**: Pre-built, accessible React components
- **Lucide Icons**: Beautiful, consistent iconography
- **Dark Mode**: Full dark mode support with system preference detection
- **Animations**: Smooth transitions and loading animations
- **Responsive Design**: Mobile-first approach (works on all devices)

## Backend Features

### Architecture
- **RESTful API** with clear separation of concerns
- **MVC Pattern**: Models, Controllers, Routes
- **Middleware**: Authentication and error handling
- **Database Indexing**: Optimized queries for performance

### Security
- **JWT Authentication**: Secure token-based auth
- **Password Hashing**: bcryptjs with salt rounds
- **Input Validation**: express-validator for all inputs
- **CORS**: Cross-origin resource sharing protection
- **Error Handling**: Comprehensive error messages

### Database
- **MongoDB**: NoSQL database for flexibility
- **Mongoose**: Schema validation and relationships
- **Indexing**: Optimized queries with proper indexes
- **Transactions**: Ready for multi-document transactions

### Performance
- Lean API responses
- Database query optimization
- Efficient data aggregation
- Token-based caching support

## Database Schema

### User Model
```javascript
{
  username: String (unique, 3-30 chars),
  email: String (unique, valid email),
  password: String (hashedPassword),
  firstName: String,
  lastName: String,
  bio: String (max 500 chars),
  profileImage: String (URL),
  theme: String ('light' | 'dark'),
  timezone: String (default: 'UTC'),
  createdAt: Date,
  updatedAt: Date
}
```

### Habit Model
```javascript
{
  userId: ObjectId (ref: User),
  name: String (required),
  description: String (max 500 chars),
  category: String ('Health', 'Fitness', 'Learning', ...),
  color: String (hex color),
  icon: String (emoji or icon),
  frequency: String ('daily' | 'weekly' | 'monthly'),
  target: Number (min: 1),
  targetUnit: String ('times', 'minutes', 'hours', 'km', ...),
  reminderTime: String (HH:MM format),
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### HabitLog Model
```javascript
{
  userId: ObjectId (ref: User),
  habitId: ObjectId (ref: Habit),
  date: Date,
  completed: Boolean,
  value: Number,
  notes: String (max 500 chars),
  mood: String ('excellent', 'good', 'neutral', 'poor', 'terrible'),
  createdAt: Date,
  updatedAt: Date
}
```

## Configuration

### Environment Variables - Backend (.env)

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/habits-tracker

# JWT
JWT_SECRET=your-super-secret-key-change-this
JWT_EXPIRE=7d

# CORS (optional)
CORS_ORIGIN=http://localhost:3000
```

### Environment Variables - Frontend (.env)

```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Habits Tracker
```

## Development

### Running in Development Mode

**Backend with auto-reload:**
```bash
cd server
npm run dev
# Uses nodemon for auto-restart on file changes
```

**Frontend with Vite HMR:**
```bash
cd client
npm run dev
# Hot Module Replacement enabled
```

### Code Quality

**Linting:**
```bash
# Frontend
cd client
npm run lint
npm run lint:fix

# Backend
cd server
npm run lint
npm run lint:fix
```

### Building for Production

**Frontend:**
```bash
cd client
npm run build
# Creates optimized build in dist/
```

**Backend:**
- No build step required
- Ready to run directly on server

## Deployment

### Frontend Deployment

#### Vercel (Recommended)
```bash
npm install -g vercel
cd client
vercel
```

#### Netlify
```bash
npm install -g netlify-cli
cd client
npm run build
netlify deploy --prod --dir dist
```

#### Traditional Server (Nginx)
```bash
cd client
npm run build

# Copy dist/ contents to web server
# Configure nginx to serve index.html for all routes
```

### Backend Deployment

#### Heroku
```bash
# Install Heroku CLI
npm install -g heroku

# Login and create app
heroku login
heroku create your-app-name

# Set environment variables
heroku config:set JWT_SECRET=your-secret
heroku config:set MONGODB_URI=your-mongodb-uri

# Deploy
git push heroku main
```

#### DigitalOcean/AWS/GCP
1. Create a Node.js application
2. Set environment variables
3. Install dependencies: `npm install --production`
4. Start server: `npm start`
5. Use PM2 for process management

#### Docker Deployment
```dockerfile
# Backend Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 5000
CMD ["npm", "start"]
```

### Database Deployment

#### MongoDB Atlas (Recommended)
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get connection string
4. Set as `MONGODB_URI` in environment variables

#### Self-hosted MongoDB
- Ensure proper backups
- Implement security measures
- Enable authentication
- Set up replication for high availability

## Best Practices

### Security
- ✅ Always use HTTPS in production
- ✅ Never commit `.env` files
- ✅ Use strong, random JWT secrets
- ✅ Implement rate limiting on API
- ✅ Validate all user inputs
- ✅ Use secure password requirements
- ✅ Keep dependencies updated

### Performance
- ✅ Enable database indexing
- ✅ Use pagination for large data sets
- ✅ Implement caching strategies
- ✅ Optimize database queries
- ✅ Minify frontend assets
- ✅ Use CDN for static files
- ✅ Monitor API response times

### Code Quality
- ✅ Follow consistent naming conventions
- ✅ Write meaningful comments
- ✅ Keep functions small and focused
- ✅ Use proper error handling
- ✅ Write unit tests
- ✅ Use linters and formatters
- ✅ Review code before merging

### User Experience
- ✅ Provide loading states
- ✅ Show clear error messages
- ✅ Implement optimistic updates
- ✅ Use accessible colors and fonts
- ✅ Make responsive for all devices
- ✅ Provide feedback on actions
- ✅ Test with real users

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## Support & Resources

- **React Documentation**: https://react.dev/
- **Node.js Documentation**: https://nodejs.org/docs/
- **MongoDB Documentation**: https://docs.mongodb.com/
- **Express.js Guide**: https://expressjs.com/
- **Tailwind CSS Docs**: https://tailwindcss.com/docs/
- **Vite Documentation**: https://vitejs.dev/guide/

## Troubleshooting

### Issue: Database Connection Error
**Solution**: Verify MongoDB URI in .env, check network access in MongoDB Atlas

### Issue: CORS Error
**Solution**: Ensure frontend URL matches CORS_ORIGIN in backend .env

### Issue: Port Already in Use
**Solution**: Change PORT in .env or kill existing process

### Issue: Authentication Token Expired
**Solution**: Token is automatically refreshed on login, clear localStorage if needed

---

**Built with passion for habit tracking and personal growth. Start building better habits today!**
