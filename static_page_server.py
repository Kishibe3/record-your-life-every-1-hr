from flask import Flask, render_template

app = Flask(__name__, static_url_path='', static_folder='', template_folder='')

@app.route('/', methods=['GET'])
def homePage():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(port=9487)