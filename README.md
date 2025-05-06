# ShmooCon Ticket Bot Dashboard 🎫🤖
*This is part of a proof-of-concept bot to automatically purchase tickets for ShmooCon, a conference that is notoriously hard to get tickets for. [See more info here.](https://github.com/ShmooConTix/ticket-bot)*

![image](https://github.com/user-attachments/assets/496b9c16-0281-4e81-b4d9-1bdb60e88f10)

> [!CAUTION]
> This project is provided for research and educational purposes only. It is intended solely as a proof of concept. The author is not responsible for any misuse or actions taken by end users based on this code. Use at your own risk. We are not affiliated with ShmooCon in any way.

## About / Features
This serves as the "user facing" portion of the ticket bot / API. *Everything* is configured and managed through here. It is built with NextJS, Shadcn, and Tailwind (basically everything you'd expect from a vibe coded SaaS). Below are the main features of the dashboard:

- Dashboard with live statistics via WebSocket
- Key-value configuration management through [the API](https://github.com/ShmooConTix/api)
- User management (as in, who will the bot get the tickets for)
- Global state management with Zustand
- Very nice looking UI
- "Riddle Mode," which allows humans to solve riddles instead of AI *(this wasn't used in the final project)*

## Installation
To run a development environment, you can run the API through the `Dockerfile`. Make sure you expose the necessary ports. If you aren't familiar with Docker, please consult the documentation.

## Contributing
This project / experiment is over and is not open to changes. Please contact me if you have questions.
