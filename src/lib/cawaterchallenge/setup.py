from setuptools import setup, find_packages


setup(
    name='cawaterchallenge',  # Required
    version='0.1',  # Required
    description='CA water challenge code',  # Required
    url='',  # Optional
    author='The Python Packaging Authority',  # Optional
    author_email='pypa-dev@googlegroups.com',  # Optional
    classifiers=[  # Optional
        'Development Status :: 3 - Alpha',
        'Intended Audience :: Developers',
        'Topic :: Software Development :: Build Tools',
        'License :: OSI Approved :: MIT License',
        'Programming Language :: Python :: 2',
        'Programming Language :: Python :: 2.7',
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: 3.4',
        'Programming Language :: Python :: 3.5',
        'Programming Language :: Python :: 3.6',
    ],
    keywords='water',  # Optional
    packages=find_packages(exclude=['contrib', 'docs', 'tests'])
)
