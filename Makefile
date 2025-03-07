DEV := npm run dev
NGROK := ngrok http --url=seasnail-alert-serval.ngrok-free.app 5173

up:
	$(DEV)

ngrok:
	$(NGROK)