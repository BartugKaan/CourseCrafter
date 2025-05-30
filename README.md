# 🎓 CourseCrafter

**Transform your expertise into structured, engaging courses with AI power!**

CourseCrafter is a modern web application that helps educators and professionals create comprehensive learning content effortlessly using AI. Whether you're a teacher, trainer, or someone who wants to organize knowledge into structured courses, CourseCrafter makes it simple and fast.

You can test it via: <a href="https://course-crafter-one.vercel.app/">CourseCrafter</a>

![CourseCrafter Banner](https://img.shields.io/badge/CourseCrafter-AI%20Powered%20Course%20Creation-green?style=for-the-badge&logo=graduation-cap)

## ✨ Features

### 🚀 **AI-Powered Course Generation**

- Generate comprehensive course structures in minutes
- Create 3-5 modules with detailed lessons
- Progressive learning paths from beginner to advanced

### 🎯 **Smart Customization**

- **Course Levels**: Beginner, Intermediate, Advanced
- **Multi-Language Support**: 8 languages including English, Turkish, Spanish, French, German, Italian, Portuguese, Russian
- **Duration Planning**: Specify course duration (1-100 hours)

### 📱 **Modern User Experience**

- Beautiful, responsive design that works on all devices
- Intuitive form-based course creation
- Real-time course generation with loading states
- Professional landing page with clear value proposition

### 🔒 **Secure & Private**

- Client-side processing for privacy
- Secure Gemini API integration

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI Integration**: Google Gemini
- **Deployment**: Vercel-ready

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun
- Google Gemini API key

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/BartugKaan/coursecrafter.git
   cd coursecrafter
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Setting Up Gemini API

1. Get your Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey)

2. **Create environment file**

   Create a `.env.local` file in the root directory of your project:

   ```bash
   touch .env.local
   ```

   Add your Gemini API key to the file:

   ```env
   NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
   ```

   Replace `your_gemini_api_key_here` with your actual Gemini API key.


## 📖 How to Use

1. **Enter Course Details**

   - Provide a course title and description
   - Select the appropriate difficulty level
   - Choose your preferred language
   - Set estimated duration (optional)

2. **Generate Course**

   - Click "Generate Course Content"
   - Wait for AI to create your structured course
   - Review the generated modules and lessons

3. **Customize & Export**
   - Review the generated content
   - Make any necessary adjustments
   - Use the structured course for your teaching needs

## 🎨 Screenshots

### Landing Page

![LandingPage](https://github.com/user-attachments/assets/0ac0bcff-9bb9-4f35-97c7-5ef45767761a)

### Course Creation Form

![ApıKeyInput](https://github.com/user-attachments/assets/ea87689d-6688-4502-a133-26ddd211eeee)
![GenerateCourse](https://github.com/user-attachments/assets/2c7c25b9-602e-409a-b145-4377199479bb)

### View Generated Course

![ViewCourse](https://github.com/user-attachments/assets/fa25e717-67ca-4f7e-a10c-91dfe22b06c6)

## 🌟 Key Benefits

- **⚡ Lightning Fast**: Generate courses in minutes, not hours
- **🎯 Smart & Adaptive**: AI adapts to your specific requirements
- **📱 Mobile Ready**: Works perfectly on all devices
- **🌍 Multi-Language**: Create courses in 8 different languages
- **🎓 Educational Focus**: Designed specifically for learning content

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Google for providing the powerful Gemini API
- Next.js team for the amazing framework
- Tailwind CSS for the beautiful styling system
- All contributors and users who make this project better

## 📞 Support

If you have any questions or need help:

- 🐛 [Report a bug](https://github.com/BartugKaan/coursecrafter/issues)
- 💡 [Request a feature](https://github.com/BartugKaan/coursecrafter/issues)
- ⭐ [Star the project](https://github.com/BartugKaan/coursecrafter) if you find it useful!
