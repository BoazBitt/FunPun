from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinLengthValidator


class Message(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_messages')
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_messages')
    content = models.CharField(validators=[MinLengthValidator(1)], max_length=200, blank=False)
    sent_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.sender.username + " to " + self.receiver.username + " " + str(self.sent_at)
