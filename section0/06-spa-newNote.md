```mermaid
    sequenceDiagram
    participant browser
    participant server

    Note right of browser: The browser executes the callback function that renders the notes
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    browser-->>server: [{"content": "note text content", "date": "2024-06-28"}]
    server-->>browser: HTTP 201 created
    deactivate server