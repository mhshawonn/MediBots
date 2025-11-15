# save as print_lyrics.py and run: python print_lyrics.py
import time
import sys

# configuration: change these to speed up / slow down
line_delay = 3.0       # seconds between each printed line
stanza_delay = 1.5     # extra pause between stanzas (blank lines)

lyrics = [
   

    # repeat the parenthetical chorus a second time (x2)
    "Mujhe ek jagah aaraam nahi",
    "ruk jana mera kaam nahi",
    "",

    "Mera saath kahan tak dogi tum",
    "main des videsh ka banjara",
    "Itna na mujhse tu pyaar badha",
    "ki main ik badal aawara",
    "kaise kisi ka sahara banoon",
    "ki main khudh beghar bechara",
    "Isliye tujhse main pyaar karoon",
    "ki too ik badal aawara",
]

def print_with_delay(lines, line_delay=1.0, stanza_delay=1.5):
    for i, line in enumerate(lines):
        # print line (blank lines create stanza breaks)
        print(line)
        sys.stdout.flush()
        # apply stanza pause for blank lines, otherwise line delay
        if line.strip() == "":
            time.sleep(stanza_delay)
        else:
            time.sleep(line_delay)

if __name__ == "__main__":
    print_with_delay(lyrics, line_delay=line_delay, stanza_delay=stanza_delay)
