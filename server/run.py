from app import create_app

if __name__ == "__main__":
    server = create_app()
    server.run(debug=True)

else:
    server = create_app()
    
# https://chatgpt.com/share/678f3871-0d24-8013-88d6-92495c4ae41c
