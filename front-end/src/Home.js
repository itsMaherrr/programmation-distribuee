import React from 'react';

const Home = () => {
    const books = [
        { id: 1, title: 'Book One', author: 'Author One', description: 'Description for book one.' },
        { id: 2, title: 'Book Two', author: 'Author Two', description: 'Description for book two.' },
        { id: 3, title: 'Book Three', author: 'Author Three', description: 'Description for book three.' },
    ];

    return (
        <div>
            <h1>Welcome to the Online Library</h1>
            <div className="book-list">
                {books.map(book => (
                    <div key={book.id} className="book">
                        <h2>{book.title}</h2>
                        <h3>by {book.author}</h3>
                        <p>{book.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;