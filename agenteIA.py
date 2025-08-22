<<<<<<< HEAD
from flask import Flask, request, jsonify
import pandas as pd
import google.generativeai as genai
from flask_cors import CORS  # Importado corretamente

# Configurar sua API KEY do Gemini
genai.configure(api_key="AIzaSyCU-aekVfPw6dudHvDzZ9j2kTzGjM7lJYo")  # Use variável de ambiente em produção

app = Flask(__name__)
CORS(app)  # ← ATIVANDO o CORS aqui!

# Resto do seu código segue normalmente...


def carregar_faq():
    # Lê a aba "Projetos" do arquivo Excel
    df = pd.read_excel("faq.xlsx", sheet_name="Projetos")
    return df

def montar_prompt(pergunta_usuario, df):
    tabela = df.to_string(index=False)
    prompt = f"""
Você é um especialista em gestão de projetos sociais. Abaixo está uma tabela com informações de projetos:

{tabela}

Com base nesses dados, responda à seguinte pergunta (ou gere insights):

Pergunta: {pergunta_usuario}
"""
    return prompt

def gerar_resposta(pergunta_usuario):
    df = carregar_faq()
    prompt = montar_prompt(pergunta_usuario, df)
    model = genai.GenerativeModel("gemini-1.5-pro-latest")
    chat = model.start_chat()
    response = chat.send_message(prompt)
    return response.text

@app.route('/chat', methods=['POST'])
def chat_endpoint():
    dados = request.get_json()
    pergunta = dados.get("pergunta")

    if not pergunta:
        return jsonify({"erro": "Pergunta não informada"}), 400

    try:
        resposta = gerar_resposta(pergunta)
        return jsonify({"resposta": resposta})
    except Exception as e:
        return jsonify({"erro": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
=======
from flask import Flask, request, jsonify
import pandas as pd
import google.generativeai as genai
from flask_cors import CORS  # Importado corretamente

# Configurar sua API KEY do Gemini
genai.configure(api_key="AIzaSyCU-aekVfPw6dudHvDzZ9j2kTzGjM7lJYo")  # Use variável de ambiente em produção

app = Flask(__name__)
CORS(app)  # ← ATIVANDO o CORS aqui!

# Resto do seu código segue normalmente...


def carregar_faq():
    # Lê a aba "Projetos" do arquivo Excel
    df = pd.read_excel("faq.xlsx", sheet_name="Projetos")
    return df

def montar_prompt(pergunta_usuario, df):
    tabela = df.to_string(index=False)
    prompt = f"""
Você é um especialista em gestão de projetos sociais. Abaixo está uma tabela com informações de projetos:

{tabela}

Com base nesses dados, responda à seguinte pergunta (ou gere insights):

Pergunta: {pergunta_usuario}
"""
    return prompt

def gerar_resposta(pergunta_usuario):
    df = carregar_faq()
    prompt = montar_prompt(pergunta_usuario, df)
    model = genai.GenerativeModel("gemini-1.5-pro-latest")
    chat = model.start_chat()
    response = chat.send_message(prompt)
    return response.text

@app.route('/chat', methods=['POST'])
def chat_endpoint():
    dados = request.get_json()
    pergunta = dados.get("pergunta")

    if not pergunta:
        return jsonify({"erro": "Pergunta não informada"}), 400

    try:
        resposta = gerar_resposta(pergunta)
        return jsonify({"resposta": resposta})
    except Exception as e:
        return jsonify({"erro": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
>>>>>>> d8987423595ab885ae0d2ef4b26cd40c713de43f
