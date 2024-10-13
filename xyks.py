import sys

import frida

device = frida.get_usb_device()

pid = device.spawn(["com.fenbi.android.leo"])

device.resume(pid)

session = device.attach(pid)

with open("interceptor.js", "r", encoding="utf-8") as f:
    script = session.create_script(f.read())


def on_message(message, data):
    print(message['payload'])


script.on('message', on_message)
script.load()
sys.stdin.read()
