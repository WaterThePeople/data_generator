import random
class TextGenerator:
    """
    This class serves as a text generator, extracting paragraphs from the given work and allowing for easy random access
    """
    def __init__(self, input_file):
        # parse data and fill the internal data store
        print(f"Reading {input_file}...")
        with open(input_file, mode='r', encoding='utf-8') as file:
            self.content = file.read().split('\n\n') # read and split the result into a list of paragraphs
        print(f"Text {input_file} initialized!")

    def get_random_paragraph(self):
        """
        get_random_paragraph: Get a random parapgraph from a list of paragraphs existing in that class.
        :return: A long string without newline characters.
        """
        if not self.content:
            return None
        else:
            return random.choice(self.content).replace('\n',' ').strip()