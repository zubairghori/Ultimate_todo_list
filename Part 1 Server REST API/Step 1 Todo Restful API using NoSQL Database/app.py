from flask import Flask, render_template_string
from flask_mongoengine import MongoEngine
from flask_user import login_required, UserManager, UserMixin