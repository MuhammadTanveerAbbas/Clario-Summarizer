<h1 align="center">Clario Summarizer ⚡ Tool 🛠</h1>
<p align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
</p>

## 🤔 Why Clario?

In a world of information overload, we're often buried in long meeting transcripts, dense articles, and rambling notes. Finding the signal in the noise is a constant battle. Clario was built to solve this problem by providing:

- **Instant Clarity:** No more wading through endless text. Get the key takeaways in seconds.
- **Multiple Perspectives:** A single text can be understood in many ways. Clario gives you the lens you need for any situation.
- **Ruthless Efficiency:** The tool is designed to be direct, honest, and sometimes brutally funny, cutting through the fluff to deliver pure value.
- **Complete Privacy:** Your data is yours. Everything is processed in your browser and never stored on our servers.

---

## ✨ Features

Clario offers a comprehensive suite of powerful features designed for maximum efficiency and a great user experience.

### 🎯 10 Powerful Summary Modes

Choose the perfect summary style for any context:

| Icon | Mode                   | Description                                                   |
| :--: | ---------------------- | ------------------------------------------------------------- |
|  📝  | **Action Items Only**  | Extracts a clean, actionable to do list.                      |
|  ⚖️  | **Decisions Made**     | Summarizes all key decisions and resolutions.                 |
|  🔥  | **Brutal Roast**       | Delivers a sarcastic, humorous critique.                      |
|  👔  | **Executive Brief**    | Provides a high level, formal summary for leaders.            |
|  📊  | **Full Breakdown**     | Offers a detailed, section by section analysis.               |
|  💬  | **Key Quotes**         | Pulls out the most impactful and memorable lines.             |
|  😊  | **Sentiment Analysis** | Analyzes the overall tone and emotion of the text.            |
|  👶  | **ELI5**               | Explains complex topics in the simplest terms.                |
|  ⚔️  | **SWOT Analysis**      | Identifies Strengths, Weaknesses, Opportunities, and Threats. |
|  🗒️  | **Meeting Minutes**    | Creates a formal, structured record of a meeting.             |

### 🔥 Additional Features

- **Copy & Export:** Instantly copy the summary text or export as PDF/Markdown with a single click.
- **History Management:** Save and access up to 50 recent summaries with load/delete functionality.
- **Character Counter:** Real time character count with visual feedback (50,000 char limit).
- **Browser Extension:** Chrome/Firefox extension to summarize text on any webpage.
- **REST API:** Programmatic access for developers and integrations.
- **Responsive Design:** Seamless experience across desktop, tablet, and mobile devices.
- **No Login Required:** Get straight to work. No accounts, no sign ups, no friction.
- **Privacy First:** HTML sanitization, rate limiting, and secure processing.
- **Rate Limiting:** API abuse prevention (10 requests/minute).
- **Testing:** Comprehensive test suite with Jest.

---

## 🚀 How to Use

Getting started with Clario is as simple as it gets.

1.  **Paste Your Text:** Navigate to the [Tool Page](https://clario-summarizer.vercel.app) and paste any text (e.g., meeting transcript, article, notes) into the text area.
2.  **Choose Your Style:** Select one of the 10 summary modes that best fits your needs.
3.  **Generate Summary:** Click the "Summarize" button and watch the magic happen. Your structured summary will appear instantly.

---

## 🛠️ Tech Stack

Clario is built with a modern, powerful, and scalable tech stack:

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **UI Library:** [React 18](https://react.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) with [ShadCN UI](https://ui.shadcn.com/) components
- **AI/Generative:** [Google AI Studio (Genkit)](https://firebase.google.com/docs/genkit) with Gemini 2.5 Flash
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Testing:** [Jest](https://jestjs.io/) + [React Testing Library](https://testing-library.com/)
- **Security:** HTML sanitization, rate limiting, input validation
- **Deployment:** [Vercel](https://vercel.com/) / [Firebase App Hosting](https://firebase.google.com/docs/app-hosting)

---

## ⚙️ Running Locally

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1.  Clone the repo
    ```sh
    git clone https://github.com/MuhammadTanveerAbbas/Clario-Summarizer
    ```
2.  Install NPM packages
    ```sh
    npm install
    ```
3.  Set up your environment variables. Copy `.env.example` to `.env.local` and add your Google AI Studio API key:
    ```sh
    cp .env.example .env.local
    ```
    Then edit `.env.local`:
    ```env
    GEMINI_API_KEY=YOUR_API_KEY
    ```
4.  Run the development server:
    ```sh
    npm run dev
    ```
5.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

<div align="center">

# 👨‍💻 Muhammad Tanveer Abbas

**SaaS MVP Developer** • **AI Integration Expert** • **Full Stack Developer**

⚡ Specialized in Building Production Ready SaaS MVPs for founders in Weeks

**Next.js • TypeScript • Firebase • AI • Tailwind CSS**

💼 **[View Portfolio](https://muhammadtanveerabbas.vercel.app/)**

---

⭐ **Star this repo** if you find it inspiring!

Built with ❤️ to showcase professional SaaS MVP development.

</div>

